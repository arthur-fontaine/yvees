import type { Service } from 'diabolo'
import { createService } from 'diabolo'

import type { VisitWithJourneyAndMuseum } from '../../screens/home/types/VisitWithJourneyAndMuseum'

export interface VisitHistoryService extends Service<'visit', {
  findVisitByUserId: (
    params: { userId: number }
  ) => Promise<VisitWithJourneyAndMuseum[]>
}> {}

export const visitHistoryService = createService<VisitHistoryService>('visit')
