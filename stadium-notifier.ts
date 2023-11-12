import { findMatches } from './matches.ts'
import { sendMessage } from "./telegram.ts";

export const findAndNotify = async () => {
  const matchesOfInterest = await findMatches()

  if (matchesOfInterest.length) {
    await sendMessage(matchesOfInterest)
  } else {
    console.log(`No matches of interest found`)
  }
}