import { envThrow } from './utils.ts'
type EmailProps = {
  to: string
  subject: string
  html: string
}

export const sendEmail = async (props: EmailProps) => {
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
  console.log(res)

  if (res.ok) {
    console.log(`Email sent successfully!`)
    console.log('body')

    console.log(await res.text())
  }
}
