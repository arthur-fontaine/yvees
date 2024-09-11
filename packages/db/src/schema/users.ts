import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { withTimestamps } from './utils/with-timestamps'
import { visits } from './visits'

export const users = sqliteTable('users', withTimestamps({
  clerkUserId: text('user').notNull(),
  id: integer('id').notNull().primaryKey(),
  name: text('name').notNull(),
}))

export const usersRelations = relations(users, ({ many }) => ({
  visits: many(visits),
}))
