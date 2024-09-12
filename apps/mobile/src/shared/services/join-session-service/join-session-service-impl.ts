import { db } from 'db/runtime/server'
import * as DI from 'diabolo'
import { eq } from 'drizzle-orm'

import type { JoinSessionService } from './join-session-service'
import { carEvent } from '../../events/car-event'
import { journeyIdSchema, journeyIdToNumber } from '../../schemas/journey-id'
import { carService } from '../car-service/car-service'

export const joinSessionServiceImpl
  = DI.lazyCreateServiceImpl<JoinSessionService>(
    () => ({
      joinSession: DI.createFunction(function* ({ journeyId }) {
        const { sendCommand } = yield * DI.requireService(carService)

        return (async function* () {
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
        }())
      }),
    }),
  )
