import type { Journey, JourneyStep, Visit } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

import type { VisitWithJourneyAndMuseum } from '../../../screens/home/types/visit-with-journey-museum'

export interface VisitService extends Service<'visit', {
  findVisitByUserId: (
    params: { userId: number }
  ) => Promise<VisitWithJourneyAndMuseum[]>
  getVisitWithJourneyById: (
    params: { visitId: number }
  ) => Promise<
    {
      journey: Journey | undefined
      journeySteps: JourneyStep[]
    } & Visit | undefined
  >
  updateVisit: (
    params: { id: number }
  ) => Promise<void>
}> { }

export const visitService = createService<VisitService>('visit')
