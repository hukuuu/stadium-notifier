import { sendEmail } from './mail.ts'
import { Fixture, findMatches } from './matches.ts'
import { envThrow } from './utils.ts'

const email = envThrow('EMAIL_USERNAME')

export const findAndNotify = async () => {
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
