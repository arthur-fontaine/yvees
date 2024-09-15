import { useAuth } from '@clerk/clerk-expo'
import { createRoute } from 'agrume'
import type { Journey, Museum, Visit } from 'db'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { visitHistoryService } from '../../../services/visit-history-service/visit-history-service'
import { serverImpls } from '../../../shared/utils/server-impls'

export type VisitWithJourneyAndMuseum = Array<{
  journey: Journey | undefined
  museum: Museum | undefined
} & Visit>

export const getVisitsByUserId = createRoute(
  DI.provide(async function* (clerckUserId: string) {
    if (clerckUserId === undefined) {
      return []
    }
    const { findVisitByClerkUserId } = yield * DI.requireService(
      visitHistoryService,
    )
    const visits = await findVisitByClerkUserId(
      { clerckUserId },
    )

    return visits.map(visit => ({
      createdAt: visit.createdAt?.toISOString(),
      id: visit.id,
      ...(visit.journey && {
        journey: {
          name: visit.journey.name,
        },
      }),
      ...(visit.museum && {
        museum: {
          name: visit.museum.name,
        },
      }),
    }))
  }, serverImpls),
  {
    path: '/get-visits:user_id',
  },
)

/**
 * Hook to get the user's visit data.
 */
export function useVisitData() {
  const [visits, setVisits]
    = useState<Awaited<ReturnType<typeof getVisitsByUserId>>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { userId } = useAuth()

  useEffect(() => {
    if (userId === undefined || userId === null) {
      setVisits([])
      setLoading(false)
      return
    }

    getVisitsByUserId(userId).then((visits) => {
      setVisits(visits)
      setLoading(false)
    })
  }, [userId])

  return { loading, visits }
}
