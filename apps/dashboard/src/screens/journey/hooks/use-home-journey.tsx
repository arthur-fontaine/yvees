import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { journeyService } from '../../../services/journey-service/journey-service'
import { journeyStepService } from '../../../services/journey-step-service/journey-step-service'
import { serverImpls } from '../../../utils/server-impls'
import type { JourneySerialized } from '../types/data-card'

/**
 * Route to get a journey by ID.
 */
export const getJourney = createRoute(
  DI.provide(async function* (journeyId: string | undefined) {
    if (!journeyId) {
      return {}
    }
    const { findJourneyById } = yield * DI.requireService(journeyService)
    const journey = await findJourneyById({ journeyId })

    return journey || {}
  }, serverImpls),
  {
    path: '/get-journey/:journeyId',
  },
)

/**
 * Route to delete a journey by ID.
 */
export const deleteJourney = createRoute(
  DI.provide(async function* (journeyId: number | undefined) {
    if (!journeyId) {
      return {}
    }

    const {
      deleteJourneyById,
    } = yield * DI.requireService(journeyService)

    await deleteJourneyById({ journeyId })

    return { success: true }
  }, serverImpls),
  {
    path: '/delete-journey/:journeyId',
  },
)

/**
 * Route to delete a journeyStep by ID.
 */
export const deleteJourneyStep = createRoute(
  DI.provide(async function* (journeyStepId: number | undefined) {
    if (!journeyStepId) {
      return {}
    }
    const {
      deleteJourneyStepsByJourneyStepId,
    } = yield * DI.requireService(journeyStepService)
    await deleteJourneyStepsByJourneyStepId({ journeyStepId })
    return { success: true }
  }, serverImpls),
  {
    path: '/delete-journey-step/:journeyId',
  },
)

/**
 * Hook to get the data for a journey by ID.
 */
export function useJourneyData(journeyId: string | undefined) {
  const [journey, setJourney] = useState<JourneySerialized | undefined>
  (undefined)
  const [loading, setLoading] = useState(true)

  const fetchJourney = async () => {
    if (!journeyId) {
      setJourney(undefined)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const fetchedJourney = await getJourney(journeyId)
      setJourney(fetchedJourney)
    }
    catch (error) {
      console.error('Failed to fetch journey:', error)
      setJourney(undefined)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJourney()
  }, [journeyId])

  return { journey, loading, refetch: fetchJourney }
}
