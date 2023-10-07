import { sendEmail } from './mail.ts'
import { findMatches, Fixture } from './matches.ts'
import { envThrow } from './utils.ts'
import { schedule, tomorrowMorning } from './schedule.ts'

const email = envThrow('EMAIL_USERNAME')

const kv = await Deno.openKv()

await schedule(kv, tomorrowMorning())
kv.listenQueue(async (_: unknown) => {
  await doWork()
  await schedule(kv, tomorrowMorning())
})

export const doWork = async () => {
  const matchesOfInterest = await findMatches()

  if (!matchesOfInterest.length) {
    console.log(`No matches of interest found`)
    return
  }

  return sendEmail({
    to: email,
    subject: "Today's Matches!",
    html: makeHtml(matchesOfInterest)
  })
}

const makeHtml = (fixtures: Fixture[]) => `
<ol>
  ${fixtures.map(
    fixture =>
      `<li><p>${fixture.teams}, ${fixture.venue} @${new Date(
        fixture.date
      ).toLocaleTimeString('bg')}</p></li>`
  )}
</ol>
`
