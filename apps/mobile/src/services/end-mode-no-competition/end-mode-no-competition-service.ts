import type { Service } from 'diabolo'
import { createService } from 'diabolo'

import type { VisitWithJourneyAndJourneyStep } from '../../screens/end-mode-no-competion/types/visit-with-journey-and-journey-step'

export interface EndModeNoCompetitionService extends Service<'visit', {
  getVisitById: (
    params: { visitId: number }
  ) => Promise<VisitWithJourneyAndJourneyStep>
}> { }

export const visitService = createService<EndModeNoCompetitionService>('visit')
