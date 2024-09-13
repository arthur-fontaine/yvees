import path from 'node:path'

import Database from 'better-sqlite3'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import fileURLToPath from 'file-uri-to-path'

import * as schema from '../schema/schema'

// eslint-disable-next-line import/no-mutable-exports
let db: {
  tables: typeof schema
} & BetterSQLite3Database<typeof schema> = undefined!

export { db }

try {
  const filename = typeof __filename !== 'undefined' ? __filename : fileURLToPath(import.meta.url)
  const dirname = path.dirname(filename)

  const dbPath = path.join(dirname, '..', '..', 'sqlite.db')

  const sqlite = new Database(dbPath)

  db = Object.assign(
    drizzle(sqlite, { schema }),
    {
      tables: schema,
    },
  )
}
catch { }
