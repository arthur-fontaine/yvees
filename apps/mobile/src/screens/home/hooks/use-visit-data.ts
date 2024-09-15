import { createRoute } from 'agrume'
import type { Journey, Museum, Visit } from 'db'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { visitHistoryService } from '../../../services/visit-history-service/visit-history-service'
import { serverImpls } from '../../../shared/utils/server-impls'

export type VisitWithJourneyAndMuseum = {
  journey: {
    museum: Museum
  } & Journey
} & Visit

export const getVisitsByUserId = createRoute(
  DI.provide(async function* (userId: number) {
    if (userId === undefined) {
      return []
    }
    const { findVisitByUserId } = yield * DI.requireService(visitHistoryService)
    const visits: VisitWithJourneyAndMuseum[] = await findVisitByUserId(
      { userId },
    )

    return visits.map(visit => ({
      createdAt: visit.createdAt?.toISOString(),
      id: visit.id,
      journey: {
        name: visit.journey.name,
      },
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
  const userId = 0 // TODO Setup ID with clerk auth

  useEffect(() => {
    if (userId === undefined) {
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
