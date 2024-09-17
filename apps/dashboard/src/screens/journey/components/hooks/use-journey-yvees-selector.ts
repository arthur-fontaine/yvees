import { useClerk } from '@clerk/clerk-react'
import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useMutation, useQuery } from 'react-query'

import { carService } from '../../../../services/car-service/car-service'
import { serverImpls } from '../../../../utils/server-impls'

const getAvailableYvees = createRoute(DI.provide(
  async function* (params: { clerkOrganizationId: string }) {
    const { findCarsAvailableForAffiliation }
      = yield * DI.requireService(carService)
    const cars = await findCarsAvailableForAffiliation(params)
    return cars
  },
  serverImpls,
), { path: '/get-available-yvees' })

const assignYveesToJourney = createRoute(DI.provide(
  async function* (params: { carId: number, journeyId: number }) {
    const { assignCarToJourney }
      = yield * DI.requireService(carService)
    await assignCarToJourney(params)
    return { success: true }
  },
  serverImpls,
), { path: '/assign-yvees-to-journey' })

const getCarAssignedToJourney = createRoute(DI.provide(
  async function* (params: { journeyId: number }) {
    const { findCarAssignedToJourney }
      = yield * DI.requireService(carService)
    const car = await findCarAssignedToJourney(params)
    // eslint-disable-next-line unicorn/no-null
    return car ?? null
  },
  serverImpls,
), { path: '/get-car-assigned-to-journey' })

/**
 * A hook to get the available Yvees for a museum and set their journey.
 */
export function useJournalYveesSelector(journey: { id: number }) {
  const session = useClerk()
  const clerkOrganizationId
    = session.user?.organizationMemberships[0]?.organization.id

  const { data: availableYvees = [], refetch: refetchAvailableYvees }
    = useQuery(
      ['getAvailableYvees', { clerkOrganizationId }],
      () => getAvailableYvees({ clerkOrganizationId: clerkOrganizationId! }),
      { enabled: !!clerkOrganizationId },
    )

  const { data: carAssignedToJourney, refetch: refetchCarAssignedToJourney }
    = useQuery(
      ['getCarAssignedToJourney', { journeyId: journey.id }],
      () => getCarAssignedToJourney({ journeyId: journey.id }),
    )

  const {
    mutate: assignYveesToJourney_,
  } = useMutation(
    (carId: number) =>
      assignYveesToJourney({ carId, journeyId: journey.id }),
    {
      onSuccess: () => {
        refetchCarAssignedToJourney()
        refetchAvailableYvees()
      },
    },
  )

  return {
    assignYveesToJourney: assignYveesToJourney_,
    availableYvees,
    carAssignedToJourney,
  }
}
