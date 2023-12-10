import { z } from 'zod'

export type Fixture = {
  id: number
  date: string
  venue: string
  venueId: number
  teams: string
}
export type League = {
  league: number
  season: number
}

export const Api = z.object({
  fixture: z.object({
    id: z.number(),
    date: z.string(),
    venue: z.object({
      name: z.string(),
      id: z.number()
    })
  }),
  teams: z.object({
    home: z.object({
      name: z.string()
    }),
    away: z.object({
      name: z.string()
    })
  })
})
export type Api = z.infer<typeof Api>

export const ApiLeague = z.object({
  league: z.object({
    id: z.number()
  }),
  seasons: z.array(
    z.object({
      current: z.boolean(),
      year: z.number()
    })
  )
})
export type ApiLeague = z.infer<typeof ApiLeague>
