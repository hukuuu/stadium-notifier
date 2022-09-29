import { sendEmail } from './mail.ts'
import { findMatches, Fixture } from './matches.ts'
import { format } from 'datetime'
import { envThrow } from './utils.ts'
import { hmac } from 'hmac'
import { opine } from 'opine'

const app = opine()

app.get('/foobar', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, () =>
  console.log('server has started on http://localhost:3000 🚀')
)

const email = envThrow('EMAIL_USERNAME')

const doWork = async () => {
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
