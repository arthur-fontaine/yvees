import { createRoute } from 'agrume'
import type { Journey, Museum, Visit } from 'db'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { visitService } from '../../../shared/services/visit-service/visit-service'
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
    const { findVisitByUserId } = yield * DI.requireService(visitService)
    const visits: VisitWithJourneyAndMuseum[] = await findVisitByUserId(
      { userId },
    )

    return visits.map((visit) => {
      return {
        ...visit,
        createdAt: visit.createdAt?.toISOString(),
        journey: {
          ...visit.journey.museum,
        },
        updatedAt: visit.updatedAt?.toISOString(),
      }
    })
  }, serverImpls),
  {
    path: '/get-visits:user_id',
  },
)

/**
 * Hook to get the user's visit data.
 */
export function useVisitData() {
  const [visits, setVisits] = useState<VisitWithJourneyAndMuseum[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const userId = 0 // TODO Setup ID with clerk auth

  useEffect(() => {
    if (userId === undefined) {
      setVisits([])
      setLoading(false)
      return
    }

    getVisitsByUserId(userId).then((visits: VisitWithJourneyAndMuseum[]) => {
      setVisits(visits)
      setLoading(false)
    })
  }, [userId])

  return { loading, visits }
}
