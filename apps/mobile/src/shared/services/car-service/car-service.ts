import * as DI from 'diabolo'

import type { IntRange } from '../../../types/int-range'
import type { JourneyId } from '../../schemas/journey-id'

export interface CarService extends DI.Service<
  'CarService',
  {
    getCarInfos: (params: { journeyId: JourneyId }) => Promise<{
      id: number
      ip: string
    }>
    getCarWebsocket: (carId: number) => Promise<WebSocket>
    moveCarByJoystickPosition: (
      carId: number,
      joystickPosition: { x: number, y: number }
    ) => Promise<void>
    sendCommand: (carId: number, command: CarCommand) => Promise<void>
  }
> { }

export const carService = DI.createService<CarService>('CarService')

type CarCommand =
  | { cmd: 1, data: [number, number, number, number] } // move
  | { cmd: 2, data: number } // face
  | { cmd: 3, data: [HeadAngle, HeadAngle] } // head angle
  | { cmd: 4, data: number } // led animation
  | { cmd: 5, data: [ColorValue, ColorValue, ColorValue, ColorValue] } // primary led color
  | { cmd: 6, data: [ColorValue, ColorValue, ColorValue, ColorValue] } // secondary led color
  | { cmd: 7, data: 0 | 1 } // alarm
  | { cmd: 8, data: [0 | 1, number] } // buzzer
  | { cmd: 9, data: 0 | 1 } // video recording
  | { cmd: 10, data: 0 | 1 } // auto mode

type HeadAngle = IntRange<0, 180>
type ColorValue = IntRange<0, 255>
