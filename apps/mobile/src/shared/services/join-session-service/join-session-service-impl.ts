import { db } from 'db/runtime/server'
import * as DI from 'diabolo'
import { eq } from 'drizzle-orm'

import type { JoinSessionService } from './join-session-service'

/**
 * A service to join a session.
 */
export const joinSessionServiceImpl = async function () {
  const { carService } = await import('../car-service/car-service')
  const { carEvent } = await import('../../events/car-event')
  const { journeyIdSchema, journeyIdToNumber } = await import('../../schemas/journey-id')
  const { carServiceImpl } = await import('../car-service/car-service-impl')

  return DI.provide(function* () {
    const { sendCommand } = yield * DI.requireService(carService)

    return DI.lazyCreateServiceImpl<JoinSessionService>(() => ({
      async *joinSession({ journeyId }) {
        const journeyIdFromUri
          = journeyIdToNumber(journeyIdSchema.parse(journeyId))

        const journey = await db
          .selectDistinct({
            car: {
              id: db.tables.cars.id,
            },
            controlMode: db.tables.journeys.controlMode,
          })
          .from(db.tables.journeys)
          .leftJoin(
            db.tables.cars,
            eq(db.tables.cars.journeyId, db.tables.journeys.id),
          )
          .where(
            eq(db.tables.journeys.id, journeyIdFromUri),
          )
          .then(rows => rows[0])

        if (!journey) {
          return
        }

        const car = journey.car

        if (!car) {
          return
        }

        if (journey.controlMode === 'automatic') {
          await sendCommand(car.id, { cmd: 10, data: 1 })
          return
        }

        await sendCommand(car.id, { cmd: 10, data: 0 })

        if (!car) {
          return
        }

        let event
        while (event = (await carEvent.iterator().next()).value) {
          if (event.args.carId === `yvees-car-${car.id}` as const) {
            yield event
          }
        }
      },
    }))
    // eslint-disable-next-line ts/naming-convention
  }, { CarService: carServiceImpl })()
}
