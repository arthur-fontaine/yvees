import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import qrcode from 'qrcode'
import { useEffect, useState } from 'react'
import serialize from 'serialize-javascript'

import type { JourneyService } from '../../../services/journey-service/journey-service'
import { journeyService } from '../../../services/journey-service/journey-service'
import { journeyStepService } from '../../../services/journey-step-service/journey-step-service'
import { serverImpls } from '../../../utils/server-impls'

/**
 * Route to get a journey by ID.
 */
export const getJourney = createRoute(
  DI.provide(async function* (journeyId: string) {
    if (!journeyId) {
      // eslint-disable-next-line fp/no-throw
      throw new Error('Journey not found')
    }
    const { findJourneyById } = yield * DI.requireService(journeyService)
    const journey = await findJourneyById({ journeyId })

    if (!journey) {
      // eslint-disable-next-line fp/no-throw
      throw new Error('Journey not found')
    }

    return serialize(journey)
  }, serverImpls),
  {
    path: '/get-journey/:journeyId',
  },
)

/**
 * Route to delete a journey by ID.
 */
export const deleteJourney = createRoute(
  DI.provide(async function* (journeyId: number | undefined) {
    if (!journeyId) {
      return { success: false }
    }

    const { deleteJourneyById } = yield * DI.requireService(journeyService)

    try {
      await deleteJourneyById({ journeyId })
      return { success: true }
    }
    catch (error) {
      return { success: false }
    }
  }, serverImpls),
  {
    path: '/delete-journey/:journeyId',
  },
)

/**
 * Route to delete a journeyStep by ID.
 */
export const deleteJourneyStep = createRoute(
  DI.provide(async function* (journeyStepId: number | undefined) {
    if (journeyStepId === undefined) {
      return {}
    }
    const {
      deleteJourneyStepsByJourneyStepId,
    } = yield * DI.requireService(journeyStepService)
    await deleteJourneyStepsByJourneyStepId({ journeyStepId })
    return { success: true }
  }, serverImpls),
  {
    path: '/delete-journey-step/:journeyId',
  },
)

/**
 * Hook to get the data for a journey by ID.
 */
export function useJourneyData(journeyId: string | undefined) {
  type FindJourneyByIdReturn = NonNullable<Awaited<ReturnType<JourneyService['value']['findJourneyById']>>>
  const [journey, setJourney] = useState<({
    journeySteps: ({
      qrCodeBase64: string
    } & FindJourneyByIdReturn['journeySteps'][number])[]
  } & FindJourneyByIdReturn) | undefined>
    (undefined)
  const [loading, setLoading] = useState(true)

  const fetchJourney = async () => {
    if (!journeyId) {
      setJourney(undefined)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      // eslint-disable-next-line no-eval
      const fetchedJourney = eval(`(${await getJourney(journeyId)})`) as Awaited<ReturnType<JourneyService['value']['findJourneyById']>>

      if (!fetchedJourney) {
        setJourney(undefined)
        return
      }

      setJourney({
        ...fetchedJourney,
        journeySteps: await Promise.all(
          fetchedJourney.journeySteps.map(async step => ({
            ...step,
            qrCodeBase64: await qrcode.toDataURL(`yvees-journey-step-${step.id}`, {
              width: 1024,
            }),
          })),
        ),
      })
    }
    catch (error) {
      console.error('Failed to fetch journey:', error)
      setJourney(undefined)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJourney()
  }, [journeyId])

  return { journey, loading, refetch: fetchJourney }
}
