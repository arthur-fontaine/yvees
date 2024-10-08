import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { journeySteps } from './journey-steps'
import { museums } from './museums'
import { withTimestamps } from './utils/with-timestamps'
import { visits } from './visits'

export const journeys = sqliteTable(
  'journeys',
  withTimestamps({
    archived: integer('archived', { mode: 'boolean' }).notNull(),
    controlMode: text('control_mode', { enum: ['automatic', 'manual'] }).notNull(),
    description: text('description'),
    draft: integer('draft', { mode: 'boolean' }).notNull(),
    id: integer('id').notNull().primaryKey(),
    museumId: integer('museum_id').notNull(),
    name: text('name').notNull(),
  }),
)

export const journeysRelations = relations(journeys, ({ many, one }) => ({
  journeySteps: many(journeySteps),
  museum: one(museums, {
    fields: [journeys.museumId],
    references: [museums.id],
  }),
  visits: many(visits),
}))
