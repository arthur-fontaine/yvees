import type { Journey, JourneyStep } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

import type { JourneyForm } from '../../screens/journey/types/create-journey'

export interface JourneyService extends Service<'journey', {
  createJourneyByMuseumId: (
    params: { clerkOrganizationId: string, journey: JourneyForm }
  ) => Promise<void>
  findJourneyById: (params: { journeyId: string }) => Promise<
    ({ averageVisitDuration: number, journeySteps: JourneyStep[] }
    & Journey) | undefined
  >
  findJourneysByMuseumId: (params: { clerkOrganizationId: string }) => Promise<
    ({ averageVisitDuration: number, journeySteps: JourneyStep[] } & Journey)[]
  >
}> { }

export const journeyService = createService<JourneyService>('journey')
