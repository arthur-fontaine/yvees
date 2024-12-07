import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useCallback, useRef } from 'react'

import { carService } from '../../../shared/services/car-service/car-service'
import { useCar } from '../../../shared/hooks/use-car'
import { type CarId, carIdToNumber } from '../../../shared/schemas/car-id'
import { serverImpls } from '../../../shared/utils/server-impls'
import type { Coordinates } from '../../../types/coordinates'

const moveCar = createRoute(DI.provide(async function* (
  { carId, coordinates }: { carId: CarId, coordinates: Coordinates },
) {
  const { moveCarByJoystickPosition } = yield * DI.requireService(carService)
  await moveCarByJoystickPosition(carIdToNumber(carId), coordinates)
  return true as const
}, serverImpls), {
  path: '/move-car',
})

/**
 * Hook to move the car.
 */
export function useMoveCar() {
  const { carInfos } = useCar()
  const lastMoveCarTs = useRef<number | undefined>()

  return {
    moveCar: useCallback(async (coordinates: Coordinates) => {
      const MOVE_CAR_DELAY = 100
      if (
        lastMoveCarTs.current !== undefined
        && coordinates.x !== 0
        && coordinates.y !== 0
        && Date.now() - lastMoveCarTs.current < MOVE_CAR_DELAY
      ) {
        return
      }

      lastMoveCarTs.current = Date.now()

      if (carInfos?.id === undefined) {
        return
      }

      await moveCar({ carId: `yvees-car-${carInfos.id}` as const, coordinates })
    }, [carInfos?.id]),
  }
}
