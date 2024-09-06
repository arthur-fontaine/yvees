import type { Visit } from '../../../../../packages/db/src/db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

export interface visitHistoryService extends Service<'visit', {
findVisitByUserId: (
    params: { userId: number }
  ) => Promise<Visit[]>
}> {}

export const visitHistoryService = createService<visitHistoryService>('visit')