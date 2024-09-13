import { relations } from 'drizzle-orm'
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

import { journeys } from './journeys'
import { users } from './users'
import { withTimestamps } from './utils/with-timestamps'

export const visits = sqliteTable('visits', withTimestamps({
  endedAt: integer('ended_at'),
  id: integer('id').notNull().primaryKey(),
  inProgress: integer('in_progress', { mode: 'boolean' }).notNull(),
  journeyId: integer('journey_id').notNull(),
  userId: integer('user_id').notNull(),
}))

export const visitsRelations = relations(visits, ({ one }) => ({
  journey: one(journeys, {
    fields: [visits.journeyId],
    references: [journeys.id],
  }),
  user: one(users, {
    fields: [visits.userId],
    references: [users.id],
  }),
}))
