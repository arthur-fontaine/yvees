import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { journeys } from './journeys'

export const museums = sqliteTable('museum', {
  clerkOrganizationId: text('clerk_organization_id').notNull(),
  id: integer('id').notNull().primaryKey(),
  name: text('name').notNull(),
})

export const museumsRelations = relations(museums, ({ many }) => ({
  journeys: many(journeys),
}))
