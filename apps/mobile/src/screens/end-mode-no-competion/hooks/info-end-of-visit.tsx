import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { EndModeNoCompetitionService } from '../../../services/end-mode-no-competition/end-mode-no-competition-service'
import { serverImpls } from '../../../shared/utils/server-impls'
import type { VisitWithJourneyAndJourneyStep } from '../types/visit-with-journey-and-journey-step'

/**
 * Route to find visit.
 */
export const getVisitById = createRoute(
  DI.provide(async function* (visitId: number) {
    if (!visitId) {
      return []
    }
    const { findVisitById } = yield *
    DI.requireService(EnModeNoCompetitionServiceImpl)
    return findVisitById({ visitId })
  }, serverImpls),
  {
    path: '/get-visit-by-id',
  },
)

/**
 *  Hook to get the data for the visit.
 */
    export function useVisitData() {
        const [visit, setVisit] = useState<
        VisitWithJourneyAndJourneyStep[] | undefined
        >([])
        const [loading, setLoading] = useState<boolean>(false)
        const id = 1

        useEffect(() => {
          if (id === undefined) {
            setVisit(undefined)
            setLoading(false)
            return
          }

          const fetchVisits = async () => {
            setLoading(true)
            try {
              const fetchedVisits = await getVisitById(id)
              setVisit(fetchedVisits)
            }
            catch (error) {
              setVisit(undefined)
            }
            finally {
              setLoading(false)
            }
          }

          fetchVisits()
        }, [id])

        return { loading, visit }
      }
