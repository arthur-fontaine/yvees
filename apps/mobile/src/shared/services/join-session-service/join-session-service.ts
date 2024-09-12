import * as DI from 'diabolo'

import type { carEvent } from '../../events/car-event'
import type { JourneyId } from '../../schemas/journey-id'
import type { CarService } from '../car-service/car-service'

export interface JoinSessionService extends DI.Service<
  'JoinSessionService',
  {
    joinSession: DI.WithServices<
      'sync',
      (params: { journeyId: JourneyId }) => ReturnType<typeof carEvent['iterator']>,
      CarService
    >
  }
> { }

export const joinSessionService = DI.createService<JoinSessionService>('JoinSessionService')
