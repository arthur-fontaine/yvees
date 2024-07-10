import type { Journey, JourneyStep } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'


export interface JourneyService extends Service<'journey', {
  findJourneysByMuseumId: (params: { clerkOrganizationId: string }) => Promise<
    (({ averageVisitDuration: number, journeySteps: JourneyStep[] } & Journey)[] | null)
  >,
  createJourneyByMuseumId: (params: { clerkOrganizationId: string, journey: Journey }) => Promise<void>
}> { }

export const journeyService = createService<JourneyService>('journey')
