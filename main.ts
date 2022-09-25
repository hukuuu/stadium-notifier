import { sendEmail } from './mail.ts'
import { findMatches, Fixture } from './matches.ts'
import { format } from 'datetime'
import { envThrow } from './utils.ts'

const email = envThrow('EMAIL_USERNAME')

const run = async () => {
  await sendEmail({
    from: email,
    to: email,
    subject: "Today's Matches!",
    content: 'not shown anywhere?',
    html: makeHtml(await findMatches())
  })
}

const makeHtml = (fixtures: Fixture[]) => `
<ol>
  ${fixtures.map(
    fixture =>
      `<li><p>${fixture.teams}, ${fixture.venue} @${format(
        new Date(fixture.date),
        'HH:mm'
      )}</p></li>`
  )}
</ol>
`

run()
