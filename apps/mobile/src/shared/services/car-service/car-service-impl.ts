import { db } from 'db/runtime/server'
import * as DI from 'diabolo'

import type { CarService } from './car-service'

export const carServiceImpl
  = DI.lazyCreateServiceImpl<CarService>(
    () => ({
      async getCarInfos(carId: number) {
        const car = await db.query.cars.findFirst({
          where: (car, { eq }) => eq(car.id, carId),
          columns: {
            ip: true,
          },
        })
        if (car === undefined) {
          throw new Error('Car not found')
        }
        return car
      },
    }),
  )
