import type { CarId } from '../schemas/car-id'
import { registerEventEmitter } from '../utils/typed-event-emitter'

export const carEvent = registerEventEmitter<{
  carCameraReceived: { carId: CarId, image: string }
}>()
