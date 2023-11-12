import { today } from './utils.ts'
import { schedule, tomorrowMorning } from './schedule.ts'
import { findAndNotify } from './stadium-notifier.ts'

export const run = async () => {
  if (await alreadRanToday()) {
    console.log(`Already ran today. Skip`)
    return
  }
  await findAndNotify()
  await kv.set(['last-run'], today())
  await schedule(kv, tomorrowMorning())
}

const alreadRanToday = async (): Promise<boolean> => {
  const td = today()
  const lastRun = await kv.get(['last-run'])
  return lastRun.value === td
}

const kv = await Deno.openKv()
await schedule(kv, tomorrowMorning())
kv.listenQueue(run)
