import { relations } from 'drizzle-orm'
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

import { journeys } from './journeys'
import { withTimestamps } from './utils/with-timestamps'

export const journeySteps = sqliteTable('journey_steps', withTimestamps({
  id: integer('id').notNull().primaryKey(),
  journeyId: integer('journey_id').notNull(),
}))

export const journeyStepsRelations = relations(journeySteps, ({ one }) => ({
  journey: one(journeys, {
    fields: [journeySteps.journeyId],
    references: [journeys.id],
  }),
}))
