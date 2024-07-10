import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { journeys } from './journeys'

export const museums = sqliteTable('museum', {
  id: integer('id').notNull().primaryKey(),
  name: text('name').notNull(),
  clerkOrganizationId: text('clerk_organization_id').notNull(),
})

export const museumsRelations = relations(museums, ({ many }) => ({
  journeys: many(journeys),
}))
