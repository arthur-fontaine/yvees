import * as DI from 'diabolo'

import type { IntRange } from '../../../types/int-range'

export interface CarService extends DI.Service<
  'CarService',
  {
    getCarWebsocket: (carId: string) => Promise<WebSocket>
    moveCarByJoystickPosition: (
      carId: string,
      joystickPosition: { x: number, y: number }
    ) => Promise<void>
    sendCommand: (carId: string, command: CarCommand) => Promise<void>
    getCarInfos: (carId: number) => Promise<{
      ip: string
    }>
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

type HeadAngle = IntRange<0, 180>
type ColorValue = IntRange<0, 255>
