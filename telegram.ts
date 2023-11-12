import { Fixture } from './matches.ts'
import { envThrow } from './utils.ts'

const NEWLINE = '%0A'
const TELEGRAM_API_TOKEN = envThrow('TELEGRAM_API_TOKEN')
const CHAT_ID = envThrow('CHAT_ID')

const makeTelegramMessage = (fixtures: Fixture[]) =>
  `
*Today Matches*${NEWLINE}
${fixtures
  .map(
    (fixture, i) =>
      `${i}. ${fixture.teams}, ${fixture.venue} @${new Date(
        fixture.date
      ).toLocaleTimeString('bg')}`
  )
  .join(NEWLINE)}
`.replaceAll(/(\.|-)/g, '\\$1') // Telegram needs . and - to be escaped

export const sendMessage = async (fixtures: Fixture[]) => {
  const message = makeTelegramMessage(fixtures)
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}&parse_mode=MarkdownV2`
  )
  console.log(res.status, await res.text())
}
