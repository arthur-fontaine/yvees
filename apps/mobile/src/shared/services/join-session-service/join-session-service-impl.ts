import * as DI from 'diabolo'

import type { JoinSessionService } from './join-session-service'
import { carEvent } from '../../events/car-event'
import { carIdSchema } from '../../schemas/car-id'

export const joinSessionServiceImpl
  = DI.lazyCreateServiceImpl<JoinSessionService>(
    () => ({
      async *joinSession(uri: string) {
        const carIdFromUri = carIdSchema.parse(uri)

        let event
        while (event = (await carEvent.iterator().next()).value) {
          if (event.args.carId === carIdFromUri) {
            yield event
          }
        }
      },
    }),
  )
