import { sendEmail } from './mail.ts'
import { findMatches, Fixture } from './matches.ts'
import { envThrow, today } from './utils.ts'
import { schedule, tomorrowMorning } from './schedule.ts'

const email = envThrow('EMAIL_USERNAME')

export const doWork = async () => {
  if (await alreadRanToday()) {
    console.log(`Already ran today. Skip`)
    return
  }
  const matchesOfInterest = await findMatches()

  if (matchesOfInterest.length) {
    await sendEmail({
      to: email,
      subject: "Today's Matches!",
      html: makeHtml(matchesOfInterest)
    })
  } else {
    console.log(`No matches of interest found`)
  }

  await kv.set(['last-run'], today())
  await schedule(kv, tomorrowMorning())
}

const alreadRanToday = async (): Promise<boolean> => {
  const td = today()
  const lastRun = await kv.get(['last-run'])
  return lastRun.value === td
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

const kv = await Deno.openKv()
// await schedule(kv, tomorrowMorning())
await schedule(kv, tomorrowMorning())
kv.listenQueue(doWork)
