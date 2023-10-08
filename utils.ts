export const env = (name: string, defaultValue: string): string =>
  Deno.env.get(name) || defaultValue

export const envThrow = (name: string): string => {
  const value = Deno.env.get(name)

  if (!value) throw new Error(`Required environment variable ${name} not found`)
  console.log(`ENV: ${name} : ${value}`)
  return value
}

export const date = (d: Date) => {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const date = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${date}`
}

export const today = () => date(new Date())
