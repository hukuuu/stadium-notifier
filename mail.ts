import { envThrow } from './utils.ts'
// import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts'

type EmailProps = {
  from: string
  to: string
  subject: string
  content: string
  html: string
}

// Deprecating, edge functions dont allow smtp because of abuse?
// export const sendEmail = async (props: EmailProps) => {
//   const client = new SmtpClient()

//   await client.connectTLS({
//     hostname: 'smtp.gmail.com',
//     port: 465,
//     username: envThrow('EMAIL_USERNAME'),
//     password: envThrow('EMAIL_PASSWORD')
//   })

//   await client.send(props)
//   await client.close()
// }

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
