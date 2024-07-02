import { sql } from 'drizzle-orm'
import type { SQLiteColumnBuilderBase } from 'drizzle-orm/sqlite-core'
import { integer } from 'drizzle-orm/sqlite-core'

type Schema = Record<string, SQLiteColumnBuilderBase>

/**
 * Add `createdAt` and `updatedAt` columns to a schema.
 */
export function withTimestamps<T extends Schema>(schema: T) {
  return {
    ...schema,
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  }
}
