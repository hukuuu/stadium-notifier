import { envThrow } from './utils.ts'
import { SmtpClient } from 'smtp'

type EmailProps = {
  from: string
  to: string
  subject: string
  content: string
  html: string
}

export const sendEmail = async (props: EmailProps) => {
  const client = new SmtpClient()

  await client.connectTLS({
    hostname: 'smtp.gmail.com',
    port: 465,
    username: envThrow('EMAIL_USERNAME'),
    password: envThrow('EMAIL_PASSWORD')
  })

  await client.send(props)
  await client.close()
}
