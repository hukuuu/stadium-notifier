export const schedule = async (kv: Deno.Kv, when: Date) => {
  const now = Date.now()
  const target = when.getTime()
  if (target < now) throw new Error(`Cannot schedle for the past: ${when}`)
  const delay = when.getTime() - Date.now()
  console.log(`schedling in: ${delay}`)
  await kv.enqueue('test', { delay })
}

export const tomorrowMorning = (): Date => {
  const d = new Date(Date.now() + 24 * 60 * 60 * 1000)
  d.setUTCHours(5)
  d.setUTCMinutes(30)
  d.setUTCSeconds(0)
  return d
}

export const in5sec = (): Date => {
  const d = new Date()
  d.setSeconds(d.getSeconds() + 5)
  return d
}
