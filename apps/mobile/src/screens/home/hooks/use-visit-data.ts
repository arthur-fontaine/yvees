import { useAuth } from '@clerk/clerk-expo'
import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { visitHistoryService } from '../../../services/visit-history-service/visit-history-service'
import { serverImpls } from '../../../shared/utils/server-impls'
import type { VisitWithJourneyAndMuseum } from '../../../../../../packages/db/src/db'

export const getVisitsByUserId = createRoute(
  DI.provide(async function* (userId: number | undefined) {
    if (!userId) {
      return [];
    }

    const { findVisitByUserId } = yield* DI.requireService(visitHistoryService);
    const visits: VisitWithJourneyAndMuseum[] = await findVisitByUserId({ userId });

    return visits.map((visit) => {
      return {
        ...visit,
        createdAt: visit.createdAt?.toISOString(),
        updatedAt: visit.updatedAt?.toISOString(),
        journey: {
          ...visit.journey.museum,
        },
      };
    });
  }, serverImpls),
  {
    path: '/get-visits',
  }
);

/**
 *  Hook to get the data for the journey card.
 */

export function useVisitData() {
  const [visit, setVisit] = useState<VisitWithJourneyAndMuseum[] | undefined>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { userId } = useAuth();
  
  useEffect(() => {
    if (userId === undefined) {
      setVisit(undefined)
      setLoading(false)
      return
    }

    const fetchVisits = async () => {
      setLoading(true)
      try {
        const fetchedVisits = await getVisitsByUserId(userId)
        setVisit(fetchedVisits)
      } catch (error) {
        setVisit(undefined)
      } finally {
        setLoading(false)
      }
    }

    fetchVisits()
  }, [userId])

  return { loading, visit }
}
