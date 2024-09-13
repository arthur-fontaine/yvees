import { visitServiceImpl } from '../../services/visit-history-service/visit-history-service-impl'
import { carServiceImpl } from '../services/car-service/car-service-impl'
import { joinSessionServiceImpl } from '../services/join-session-service/join-session-service-impl'

/* eslint-disable ts/naming-convention */
export const serverImpls = {
  CarService: carServiceImpl,
  JoinSessionService: joinSessionServiceImpl,
  visit: visitServiceImpl,

}
/* eslint-enable ts/naming-convention */
