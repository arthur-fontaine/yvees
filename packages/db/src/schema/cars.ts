import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { museums } from './museums'

export const cars = sqliteTable('car', {
  battery: integer('battery').notNull(),
  id: integer('id').notNull().primaryKey(),
  ip: text('ip').notNull(),
  journeyId: integer('journey_id'),
  museumId: integer('museum_id').notNull(),
})

export const carsRelations = relations(cars, ({ one }) => ({
  journey: one(cars, {
    fields: [cars.journeyId],
    references: [cars.id],
  }),
  museum: one(museums, {
    fields: [cars.museumId],
    references: [museums.id],
  }),
}))
