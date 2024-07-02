import Database from 'better-sqlite3'
import type * as schema from 'db/schema'
import { journeySteps, journeys, museums, users, visits } from 'db/schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const sqlite = new Database('sqlite.db')

export const db = Object.assign(drizzle<typeof schema>(sqlite), {
  tables: {
    journeySteps,
    journeys,
    museums,
    users,
    visits,
  },
})
