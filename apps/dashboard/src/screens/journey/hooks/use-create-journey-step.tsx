import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useState } from 'react'

import { journeyStepService } from '../../../services/journey-step-service/journey-step-service'
import { serverImpls } from '../../../utils/server-impls'
import type { JourneyStepForm } from '../types/create-journey-step'

const insertJourneyStep = createRoute(
  DI.provide(
    async function* ({
      journeyStep,
    }: {
      journeyStep: JourneyStepForm
    }) {
      const { createJourneyStepByJourneyId } = yield * DI.requireService(
        journeyStepService,
      )
      await createJourneyStepByJourneyId({ journeyStep })
      return { success: true }
    },
    serverImpls,
  ),
  {
    path: '/insert-journey-step',
  },
)

/**
 * Hook to insert a journeyStep.
 */
export function useInsertJourneyStep() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const insertNewJourneyStep = async (journeyStep: JourneyStepForm):
  Promise<void> => {
    setLoading(true)
    setError(undefined)

  try {
      await insertJourneyStep({ journeyStep })
      setLoading(false)
    }
  catch (err) {
      setError('Failed to insert journey')
      setLoading(false)
    }
  }

  return { error, insertNewJourneyStep, loading }
}
