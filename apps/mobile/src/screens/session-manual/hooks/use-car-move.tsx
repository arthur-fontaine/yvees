import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useCallback } from 'react'

import { useCar } from '../../../shared/hooks/use-car'
import { type CarId, carIdToNumber } from '../../../shared/schemas/car-id'
import { carService } from '../../../shared/services/car-service/car-service'
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
  const { carId } = useCar()

  return {
    moveCar: useCallback(async (coordinates: Coordinates) => {
      if (carId === undefined) {
        return
      }

      await moveCar({ carId, coordinates })
    }, [carId]),
  }
}
