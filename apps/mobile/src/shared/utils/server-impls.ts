import { carServiceImpl } from '../services/car-service/car-service-impl'
import { joinSessionServiceImpl } from '../services/join-session-service/join-session-service-impl'
import { visitServiceImpl } from '../services/visit-service/visit-service-impl'

/* eslint-disable ts/naming-convention */
export const serverImpls = {
  CarService: carServiceImpl,
  JoinSessionService: joinSessionServiceImpl,
  Visit: visitServiceImpl,
}
/* eslint-enable ts/naming-convention */
