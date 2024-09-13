import { db } from 'db/runtime/server'
import * as DI from 'diabolo'
import { and, eq, isNull, sql } from 'drizzle-orm'

import type { CarService } from './car-service'

export const carServiceImpl = DI.lazyCreateServiceImpl<CarService>(() => ({
  async assignCarToJourney({ carId, journeyId }) {
    await db.update(db.tables.cars)
      .set({
        // eslint-disable-next-line unicorn/no-null
        journeyId: null,
      })
      .where(eq(db.tables.cars.journeyId, journeyId))

    await db.update(db.tables.cars)
      .set({
        journeyId,
      })
      .where(eq(db.tables.cars.id, carId))
  },

  async findCarAssignedToJourney({ journeyId }) {
    return await db
      .selectDistinct({
        id: db.tables.cars.id,
        name: sql<string>`CAST(${db.tables.cars.id} AS VARCHAR)`,
      })
      .from(db.tables.cars)
      .where(eq(db.tables.cars.journeyId, journeyId))
      .then(cars => cars[0])
  },

  async findCarsAvailableForAffiliation({ clerkOrganizationId }) {
    return await db
      .selectDistinct({
        id: db.tables.cars.id,
        name: sql<string>`CAST(${db.tables.cars.id} AS VARCHAR)`,
      })
      .from(db.tables.cars)
      .innerJoin(
        db.tables.museums,
        eq(db.tables.cars.museumId, db.tables.museums.id),
      )
      .where(and(
        isNull(db.tables.cars.journeyId),
        eq(db.tables.museums.clerkOrganizationId, clerkOrganizationId),
      ))
  },
}))
