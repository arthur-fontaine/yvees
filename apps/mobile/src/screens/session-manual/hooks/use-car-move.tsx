import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useCallback } from 'react'

import type { CarId } from '../../../shared/schemas/car-id'
import { carService } from '../../../shared/services/car-service/car-service'
import { serverImpls } from '../../../shared/utils/server-impls'
import type { Coordinates } from '../../../types/coordinates'

const moveCar = createRoute(DI.provide(async function* (
  { carId, coordinates }: { carId: CarId, coordinates: Coordinates },
) {
  console.log('Moving car', carId, coordinates)
  const { moveCarByJoystickPosition } = yield * DI.requireService(carService)
  console.log(moveCarByJoystickPosition)
  await moveCarByJoystickPosition(carId, coordinates)
  return true as const
}, serverImpls), {
  path: '/move-car',
})

/**
 * Hook to move the car.
 */
export function useMoveCar() {
  // const { carId } = useCar()
  const carId = 'yvees-car-1'

  return {
    moveCar: useCallback(async (coordinates: Coordinates) => {
      if (carId === undefined) {
        return
      }

      await moveCar({ carId, coordinates })
    }, [carId]),
  }
}
