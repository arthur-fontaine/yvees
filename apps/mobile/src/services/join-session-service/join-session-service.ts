import * as DI from 'diabolo'

import type { carEvent } from '../../events/car-event'

export interface JoinSessionService extends DI.Service<
  'JoinSessionService',
  {
    joinSession: (uri: string) => ReturnType<typeof carEvent['iterator']>
  }
> { }

export const joinSessionService = DI.createService<JoinSessionService>('JoinSessionService')
