import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { visitHistoryService } from '../../../services/visit-history-service/visit-history-service'
import { serverImpls } from '../../../utils/server-impl'
import type { VisitByUserIdSerialized } from '../types/visit'

export const getVisitsByUserId = createRoute(
  DI.provide(async function* (userId: number | undefined) {
    if (!userId) {
      return []
    }
    const { findVisitByUserId } = yield * DI.requireService(visitHistoryService)
    console.warn('Service findVisitByUserId:', findVisitByUserId)

    const visits = await findVisitByUserId({ userId })
    return visits?.map((visit) => {
      return {
        ...visit,
        createdAt: visit.createdAt?.toISOString(),
        updatedAt: visit.updatedAt?.toISOString(),
      }
    })
  }, serverImpls),
  {
    path: '/get-visits',
  },
)

/**
 *  Hook to get the data for the journey card.
 */

/**
 *
 */
export function useVisitData(userId: number) {
  const [visit, setVisit] = useState<VisitByUserIdSerialized[] | undefined>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!userId) {
      setVisit(undefined)
      setLoading(false)
      return
    }

    const fetchVisits = async () => {
      setLoading(true)
      try {
        const fetchedVisits = await getVisitsByUserId(userId)
        setVisit(fetchedVisits)
      }
      catch (error) {
        console.error('Failed to fetch visits:', error)
        setVisit(undefined)
      }
      finally {
        setLoading(false)
      }
    }

    fetchVisits()
  }, [userId])

  return { loading, visit }
}
