import type { Journey, Museum, Visit } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

export interface VisitHistoryService extends Service<'visit', {
  findVisitByClerkUserId: (
    params: { clerckUserId: string }
  ) => Promise<Array<{
    journey: Journey | undefined
    museum: Museum | undefined
  } & Visit>>
}> {}

export const visitHistoryService = createService<VisitHistoryService>('visit')
