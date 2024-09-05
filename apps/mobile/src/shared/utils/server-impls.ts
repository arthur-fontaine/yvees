import { carServiceImpl } from '../services/car-service/car-service-impl'
import { joinSessionServiceImpl } from '../services/join-session-service/join-session-service-impl'

/* eslint-disable ts/naming-convention */
export const serverImpls = {
  JoinSessionService: joinSessionServiceImpl,
  CarService: carServiceImpl,
}
/* eslint-enable ts/naming-convention */
