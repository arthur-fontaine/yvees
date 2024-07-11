import type { Journey, JourneyStep } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

interface JourneyTest {
  description: string
  draft: boolean
  name: string
}

export interface JourneyService extends Service<'journey', {
  createJourneyByMuseumId: (
    params: { clerkOrganizationId: string, journey: JourneyTest }
  ) => Promise<void>
  findJourneysByMuseumId: (params: { clerkOrganizationId: string }) => Promise<
    ({ averageVisitDuration: number, journeySteps: JourneyStep[] } & Journey)[]
  >
}> { }

export const journeyService = createService<JourneyService>('journey')
