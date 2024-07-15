import Database from 'better-sqlite3'
import * as schema from 'db/schema'
import { journeySteps, journeys, museums, users, visits } from 'db/schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const sqlite = new Database('sqlite.db')

export const db = Object.assign(drizzle(sqlite, { schema }), {
  tables: {
    journeySteps,
    journeys,
    museums,
    users,
    visits,
  },
})
