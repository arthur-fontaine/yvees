import * as DI from 'diabolo'

import type { IntRange } from '../../../types/int-range'

export interface CarService extends DI.Service<
  'CarService',
  {
    getCarInfos: (carId: number) => Promise<{
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

export const carCommand = {
  alarm: 7 as const,
  buzzer: 8 as const,
  face: 2 as const,
  headAngle: 3 as const,
  ledAnimation: 4 as const,
  move: 1 as const,
  primaryLedColor: 5 as const,
  secondaryLedColor: 6 as const,
}

type CarCommand =
  | {
    cmd: typeof carCommand.primaryLedColor
    data: [ColorValue, ColorValue, ColorValue, ColorValue]
  } // primary led color
  | {
    cmd: typeof carCommand.secondaryLedColor
    data: [ColorValue, ColorValue, ColorValue, ColorValue]
  } // secondary led color
  | { cmd: typeof carCommand.alarm, data: 0 | 1 } // alarm
  | { cmd: typeof carCommand.buzzer, data: [0 | 1, number] } // buzzer
  | { cmd: typeof carCommand.face, data: number } // face
  | { cmd: typeof carCommand.headAngle, data: [HeadAngle, HeadAngle] } // head angle
  | { cmd: typeof carCommand.ledAnimation, data: number } // led animation
  | { cmd: typeof carCommand.move, data: [number, number, number, number] } // move

type HeadAngle = IntRange<0, 180>
type ColorValue = IntRange<0, 255>
