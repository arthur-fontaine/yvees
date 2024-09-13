import { db } from 'db/runtime/server'
import * as DI from 'diabolo'

import type { CarService } from './car-service'
import { journeyIdToNumber } from '../../schemas/journey-id'

export const carServiceImpl = DI.lazyCreateServiceImpl<CarService>(
  () => {
    const websockets = new Map<number, WebSocket>()

    const carService: CarService['value'] = {
      async getCarInfos({ journeyId }) {
        const journeyIdFromUri = journeyIdToNumber(journeyId)

        const car = await db.query.cars.findFirst({
          columns: {
            id: true,
            ip: true,
          },
          where: (car, { eq }) => eq(car.journeyId, journeyIdFromUri),
        })
        if (car === undefined) {
          // eslint-disable-next-line fp/no-throw
          throw new Error('Car not found')
        }
        return car
      },
      async getCarWebsocket(carId) {
        if (websockets.has(carId)) {
          const websocket = websockets.get(carId)!
          if (websocket.readyState === WebSocket.OPEN) {
            return websocket
          }
        }

        const car = await db.query.cars.findFirst({
          columns: {
            ip: true,
          },
          where: (car, { eq }) => eq(car.id, carId),
        })

        if (car === undefined) {
          // eslint-disable-next-line fp/no-throw
          throw new Error('Car not found')
        }

        const websocket = new WebSocket(`ws://${car.ip}:80/ws`)
        websockets.set(carId, websocket)

        return websocket
      },
      async moveCarByJoystickPosition(carId, joystickPosition) {
        if (joystickPosition.x < -1 || joystickPosition.x > 1) {
          // eslint-disable-next-line fp/no-throw
          throw new Error('Invalid joystick x position')
        }

        if (joystickPosition.y < -1 || joystickPosition.y > 1) {
          // eslint-disable-next-line fp/no-throw
          throw new Error('Invalid joystick y position')
        }

        // const deadSpeed = 500
        // const speedMax = 4095

        // const speedFactor
        //   = Math.abs(joystickPosition.y) < 0.2
        //     ? (
        //       Math.sqrt(joystickPosition.x ** 2 + joystickPosition.y ** 2)
        //       * (joystickPosition.y > 0 ? 1 : -1)
        //     )
        //     : joystickPosition.y

        // const extraSpeed
        //   = joystickPosition.y > 0 ? deadSpeed
        //   : joystickPosition.y < 0 ? -deadSpeed
        //   : 0

        // const rightSpeed = (speedMax - deadSpeed) * speedFactor
        //   * (joystickPosition.x < 0 ? 1 : 1 - joystickPosition.x)
        //   + extraSpeed
        // const leftSpeed = (speedMax - deadSpeed) * speedFactor
        //   * (joystickPosition.x > 0 ? 1 : 1 + joystickPosition.x)
        //   + extraSpeed

        // console.log([leftSpeed, leftSpeed, rightSpeed, rightSpeed])

        // await carService.sendCommand(carId, {
        //   cmd: 1,
        //   data: [leftSpeed, leftSpeed, rightSpeed, rightSpeed],
        // })

        const speedMax = 4095

        const joystickDistanceToCenter = Math.sqrt(
          joystickPosition.x ** 2 + joystickPosition.y ** 2,
        )

        const angle = Math.atan2(joystickPosition.y, joystickPosition.x)
        const absoluteAngleDegrees = Math.abs((angle * 180) / Math.PI)
        const angleRatio = Math.min(
          absoluteAngleDegrees,
          Math.abs(180 - absoluteAngleDegrees),
        ) / 90

        const wayFactor = joystickPosition.y > 0 ? 1 : -1

        const speedLittleSide = (
          (speedMax * joystickDistanceToCenter)
          * (1 - Math.abs(joystickPosition.x)) // Turn speed
          * angleRatio
          * wayFactor
        )
        const speedBigSide = speedMax * joystickDistanceToCenter * wayFactor

        const [leftSpeed, rightSpeed] = joystickPosition.x > 0
          ? [speedBigSide, speedLittleSide] // turn right
          : [speedLittleSide, speedBigSide] // turn left or go straight

        await carService.sendCommand(carId, {
          cmd: 1,
          data: [leftSpeed, leftSpeed, rightSpeed, rightSpeed],
        })
      },
      async sendCommand(carId, command) {
        const websocket = await carService.getCarWebsocket(carId)
        if (websocket.readyState !== WebSocket.OPEN) {
          await new Promise((resolve, reject) => {
            websocket.addEventListener('open', resolve)
            websocket.addEventListener('error', reject)
            setTimeout(() => reject(new Error('Timeout')), 5000)
          })
        }
        websocket.send(JSON.stringify(command))
      },
    }

    return carService
  },
)
