import { createRoute } from 'agrume'
import type { Journey, JourneyStep, Visit } from 'db'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { visitService } from '../../../shared/services/visit-service/visit-service'
import { serverImpls } from '../../../shared/utils/server-impls'

export type VisitWithJourneyAndJourneyStep = {
  journey: {
    journeyStep: JourneyStep
  } & Journey
} & Visit

/**
 * Route to get visit with journey.
 */
export const getVisitWithJourney = createRoute(
  DI.provide(async function* (visitId: number) {
    if (!visitId) { return undefined }

    const { getVisitWithJourneyById } = yield* DI.requireService(visitService)
    const visitWithJourney = await getVisitWithJourneyById({ visitId })

    if (!visitWithJourney) { return undefined }

    return {
      ...visitWithJourney,
      journeySteps: visitWithJourney.journeySteps.length,
    }
  }, serverImpls),
  {
    path: '/get-visit/:visitId',
  },
)


/**
 *  Hook to get the data for the visit.
 */
export function useVisitWithJourney() {
  const [visits, setVisits] = useState<VisitWithJourneyAndJourneyStep[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const visitId = 1 // TODO Setup ID with clerk auth

  useEffect(() => {
    if (visitId === undefined) {
      setVisits([])
      setLoading(false)
      return
    }

      getVisitWithJourney(visitId)
      .then((visits: VisitWithJourneyAndJourneyStep[]) => {
      setVisits(visits)
      setLoading(false)
    })
  }, [visitId])

  return { loading, visits }
}
