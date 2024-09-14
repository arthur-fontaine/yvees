import * as DI from 'diabolo'

import type { carEvent } from '../../events/car-event'
import type { JourneyId } from '../../schemas/journey-id'

export interface JoinSessionService extends DI.Service<
  'JoinSessionService',
  {
    joinSession: (params: { journeyId: JourneyId }) => ReturnType<typeof carEvent['iterator']>
  }
> { }

export const joinSessionService = DI.createService<JoinSessionService>('JoinSessionService')
