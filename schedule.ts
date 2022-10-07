import { envThrow } from './utils.ts'

const apiBaseUrl = 'https://app.jiter.dev/api'

const jiterApiKey = envThrow('JITER_API_KEY')
const hookUrl = envThrow('HOOK_URL')

export const createEvent = async (when: Date) => {
  try {
    const res = await fetch(`${apiBaseUrl}/events`, {
      method: 'POST',
      body: JSON.stringify({
        destination: hookUrl,
        scheduledTime: when,
        payload: JSON.stringify({ foo: 'bar' })
      }),
      headers: { 'Content-Type': 'application/json', 'x-api-key': jiterApiKey }
    })

    const data = await res.text()

    console.log('Event created 🎉', data)
  } catch (error) {
    console.log('Unable to create event', error)
  }
}
