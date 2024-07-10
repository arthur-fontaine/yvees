import { useClerk } from '@clerk/clerk-react'
import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { journeyService } from '../../../services/journey-service/journey-service'
import { serverImpls } from '../../../utils/server-impls'
// import { Journey } from 'db'
import type { JourneySerialized } from '../types/data-card'

export const getJourney = createRoute(
  DI.provide(async function* (clerkOrganizationId: string | undefined) {
    if (!clerkOrganizationId) {
      return []
    }
    const { findJourneysByMuseumId } = yield * DI.requireService(journeyService)
    const journeys = await findJourneysByMuseumId({ clerkOrganizationId })
    return journeys?.map((journey) => {
      return {
        ...journey,
        createdAt: journey.createdAt?.toISOString(),
        journeySteps: journey.journeySteps?.map((step) => {
          return {
            ...step,
            createdAt: step.createdAt?.toISOString(),
            updatedAt: step.updatedAt?.toISOString(),
          }
        }) ?? [],
        updatedAt: journey.updatedAt?.toISOString(),
      }
    }) ?? []
  }, serverImpls),
)

// const insertJourney = createRoute(
//   DI.provide(async function* ({ clerkOrganizationId, journey }: { clerkOrganizationId: string, journey: Journey }) {
//     const { createJourneyByMuseumId } = yield* DI.requireService(journeyService);
//     await createJourneyByMuseumId({ clerkOrganizationId, journey });
//     return { success: true };
//   }, serverImpls)
// );

/**
 *  Hook to get the data for the journey card.
 */
export function useDataBoard() {
  const session = useClerk()
  const clerkOrganizationId
   = session.user?.organizationMemberships[0]?.organization.id
  const [journey, setJourney] = useState<JourneySerialized[] | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJourney(clerkOrganizationId).then((journey) => {
      setJourney(journey)
      setLoading(false)
    })
  }, [clerkOrganizationId])
  return { journey, loading }
};
