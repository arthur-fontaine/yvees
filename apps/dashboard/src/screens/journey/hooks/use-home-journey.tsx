import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { journeyService } from '../../../services/journey-service/journey-service'
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
 * Hook to get the data for a journey by ID.
 */
export function useJourneyData(journeyId: string | undefined) {
  const [journey, setJourney] = useState<JourneySerialized | undefined>
  (undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!journeyId) {
      setJourney(undefined)
      setLoading(false)
      return
    }

    const fetchJourney = async () => {
      setLoading(true)
      try {
        // Fetch journey data using the getJourney function
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

    fetchJourney()
  }, [journeyId])

  return { journey, loading }
}
