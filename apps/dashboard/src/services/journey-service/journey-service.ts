import type { Journey, JourneyStep } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

export interface JourneyService extends Service<'journey', {
  createJourneyByMuseumId: (
    params: { clerkOrganizationId: string, journey: Journey }
  ) => Promise<void>
  findJourneysByMuseumId: (params: { clerkOrganizationId: string }) => Promise<
    ({ averageVisitDuration: number, journeySteps: JourneyStep[] } & Journey)[]
  >
}> { }

export const journeyService = createService<JourneyService>('journey')
