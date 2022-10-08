import { envThrow } from './utils.ts'
type EmailProps = {
  to: string
  subject: string
  html: string
}

export const sendEmail1 = async (props: EmailProps) => {
  const url = 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send'

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': envThrow('EMAIL_API_KEY'),
      'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: props.to }], subject: props.subject }],
      from: { email: 'stadiumnotifier@example.com' },
      content: [{ type: 'text/html', value: props.html }]
    })
  }

  const res = await fetch(url, options)
  const body = await res.text()
  console.log(body)
}
