import { db } from 'db/runtime/server'
import * as DI from 'diabolo'

import type { JoinSessionService } from './join-session-service'
import { carEvent } from '../../events/car-event'
import { journeyIdSchema, journeyIdToNumber } from '../../schemas/journey-id'

export const joinSessionServiceImpl
  = DI.lazyCreateServiceImpl<JoinSessionService>(
    () => ({
      async *joinSession({ journeyId }) {
        const journeyIdFromUri
          = journeyIdToNumber(journeyIdSchema.parse(journeyId))

        const car = await db.query.cars.findFirst({
          where: (cars, { eq }) => eq(cars.journeyId, journeyIdFromUri),
        })

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
    }),
  )
