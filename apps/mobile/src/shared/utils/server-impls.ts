import { visitServiceImpl } from '../../services/visit-history-service/visit-history-service-impl'
import { joinSessionServiceImpl } from '../services/join-session-service/join-session-service-impl'

/* eslint-disable ts/naming-convention */
export const serverImpls = {
  JoinSessionService: joinSessionServiceImpl,
  visit: visitServiceImpl,

}
/* eslint-enable ts/naming-convention */
