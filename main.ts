import { sendEmail1 } from './mail.ts'
import { findMatches, Fixture } from './matches.ts'
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts'
import { envThrow } from './utils.ts'
import { hmac } from 'https://deno.land/x/hmac@v2.0.1/mod.ts'
import { serve } from 'https://deno.land/std@0.140.0/http/server.ts'
import { createEvent } from './schedule.ts'

const jiterSecret = envThrow('JITER_SECRET')
const email = envThrow('EMAIL_USERNAME')

serve(async (req: Request) => {
  const body = await req.json()
  console.log(body)

  const theirSign = req.headers.get('Jiter-Signature')
  const mySign = hmac('sha256', jiterSecret, body.payload, 'utf-8', 'base64')
  console.log(theirSign)
  console.log(mySign)
  if (theirSign !== mySign) return new Response('Unauthorized', { status: 401 })

  await doWork()
  await createEvent(tomorrow())

  return new Response('', { status: 200 })
})

const tomorrow = (): Date => {
  const d = new Date(Date.now() + 24 * 60 * 60 * 1000)
  d.setUTCHours(5)
  d.setUTCMinutes(30)
  d.setUTCSeconds(0)
  return d
}

export const doWork = async () => {
  const matchesOfInterest = await findMatches()

  if (matchesOfInterest.length)
    return sendEmail1({
      to: email,
      subject: "Today's Matches!",
      html: makeHtml(matchesOfInterest)
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
