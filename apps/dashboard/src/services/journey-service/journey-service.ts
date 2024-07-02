import type { Journey, JourneyStep } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

export interface JourneyService extends Service<'journey', {
  findJourneysByMuseumId: (params: { museumId: number }) => Promise<
    ({ averageVisitDuration: number, journeySteps: JourneyStep[] } & Journey)[]
  >
}> { }

export const journeyService = createService<JourneyService>('journey')
