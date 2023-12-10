import { Api, ApiLeague, League, Fixture } from './types.ts'
import { envThrow, date } from './utils.ts'

const url = 'https://api-football-v1.p.rapidapi.com/v3'
const headers = {
  'X-RapidAPI-Key': envThrow('MATCHES_API_KEY'),
  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
}

const query = (obj: Record<string, string | number>) =>
  '?' +
  Object.entries(obj)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')

const trimFixture = ({ fixture, teams }: Api): Fixture => ({
  id: fixture.id,
  date: fixture.date,
  // venue: `${fixture.venue.name}(${fixture.venue.id})`,
  venue: fixture.venue.name,
  venueId: fixture.venue.id,
  teams: teams.home.name + ' - ' + teams.away.name
})

const getFixtures = async (league: League): Promise<Fixture[]> => {
  const d = new Date()
  console.log(`Getting matches for league ${league.league}, ${date(d)}`)

  const params = { ...league, date: date(d) }
  console.log(`${url}/fixtures${query(params)}`)
  const res = await fetch(`${url}/fixtures${query(params)}`, {
    headers
  })
  
  return (await res.json()).response.map(Api.parse).map(trimFixture)
}

const trimLeague = (league: ApiLeague): League => ({
  league: league.league.id,
  season: league.seasons.find(s => s.current)!.year
})

const getLeagues = async (): Promise<League[]> => {
  const params = {
    country: 'Bulgaria'
  }
  const res = await fetch(`${url}/leagues${query(params)}`, {
    headers
  })
  return (await res.json()).response.map(ApiLeague.parse).map(trimLeague)
}

export const findMatches = async () => {
  const leaguesOfInterest = [
    174, //Cup
    172, //First League
    656 //Supercup
  ]
  const leagues = (await getLeagues()).filter(league =>
    leaguesOfInterest.includes(league.league)
  )
  const fixtures = await Promise.all(leagues.map(getFixtures))

  const venuesOfInterest = [
    288, // Stadion Balgarska Armia
    1912 // Stadion Vasil Levski
  ]

  const fixturesOfInterest = fixtures
    .flat()
    .filter(f => venuesOfInterest.includes(f.venueId))

  return fixturesOfInterest
}
