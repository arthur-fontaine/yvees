import type { Journey, JourneyStep } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

import type { JourneyForm } from '../../screens/journey/types/create-journey'

export interface JourneyService
  extends Service<
    'journey',
    {
      createJourneyByMuseumId: (params: {
        clerkOrganizationId: string
        journey: JourneyForm
      }) => Promise<void>
      deleteJourneyById: (params: { journeyId: number }) => Promise<void>
      findJourneyById: (params: { journeyId: string }) => Promise<
        | ({
          averageVisitDuration: number
          journeySteps: JourneyStep[]
        } & Journey)
        | undefined
      >
      findJourneysByMuseumId: (params: {
        clerkOrganizationId: string
      }) => Promise<
        ({
          averageVisitDuration: number
          numberOfSteps: number
        } & Pick<Journey, 'description' | 'id' | 'name'>)[]
      >
      updateJourneyControlMode: (params: {
        controlMode: 'automatic' | 'manual'
        journeyId: number
      }) => Promise<void>
    }
  > { }

export const journeyService = createService<JourneyService>('journey')
