import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { journeys } from './journeys'
import { withTimestamps } from './utils/with-timestamps'

export const journeySteps = sqliteTable('journey_steps', withTimestamps({
  description: text('description'),
  end: integer('end', { mode: 'boolean' }).notNull(),
  id: integer('id').notNull().primaryKey(),
  journeyId: integer('journey_id').notNull(),
  name: text('name').notNull(),
  start: integer('start', { mode: 'boolean' }).notNull(),
}))

export const journeyStepsRelations = relations(journeySteps, ({ one }) => ({
  journey: one(journeys, {
    fields: [journeySteps.journeyId],
    references: [journeys.id],
  }),
}))
