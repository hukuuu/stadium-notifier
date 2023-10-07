export const env = (name: string, defaultValue: string): string =>
  Deno.env.get(name) || defaultValue

export const envThrow = (name: string): string => {
  const value = Deno.env.get(name)

  if (!value) throw new Error(`Required environment variable ${name} not found`)
  console.log(`ENV: ${name} : ${value}`)
  return value
}
