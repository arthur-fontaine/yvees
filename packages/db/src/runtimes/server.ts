import path from 'node:path'

import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import fileURLToPath from 'file-uri-to-path'

import * as schema from '../schema/schema'

const filename = __filename ?? fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dbPath = path.join(dirname, '..', '..', 'sqlite.db')

const sqlite = new Database(dbPath)

export const db = Object.assign(
  drizzle(sqlite, { schema }),
  {
    tables: schema,
  },
)
