import { useClerk } from '@clerk/clerk-react'
import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { journeyService } from '../../../services/journey-service/journey-service'
import { serverImpls } from '../../../utils/server-impls'

/**
 * Route to find journey by museum ID.
 */
export const getJourney = createRoute(
  DI.provide(async function* (clerkOrganizationId: string | undefined) {
    if (!clerkOrganizationId) {
      return []
    }
    const { findJourneysByMuseumId } = yield * DI.requireService(journeyService)
    return findJourneysByMuseumId({ clerkOrganizationId })
  }, serverImpls),
)

/**
 *  Hook to get the data for the journey card.
 */
export function useJourneysData() {
  const session = useClerk()
  const clerkOrganizationId
    = session.user?.organizationMemberships[0]?.organization.id
  const [journeys, setJourneys]
    = useState<Awaited<ReturnType<typeof getJourney>>>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getJourney(clerkOrganizationId).then((journeys) => {
      setJourneys(journeys)
      setLoading(false)
    })
  }, [clerkOrganizationId])
  return { journeys, loading }
};
