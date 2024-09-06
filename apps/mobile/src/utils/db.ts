import Database from 'better-sqlite3'
import * as schema from 'db/schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const sqlite = new Database('sqlite.db')

const journeySteps = schema.journeySteps;
const journeys = schema.journeys;
const museums = schema.museums;
const users = schema.users;
const visits = schema.visits;

export const db = Object.assign(drizzle(sqlite, { schema }), {
  tables: {
    journeySteps,
    journeys,
    museums,
    users,
    visits,
  },
})