import { createGroup, createRouter } from '@swan-io/chicane'

/* eslint-disable ts/naming-convention */
export const RouteNames = {
  DATA: 'data' as const,
  JOURNEY_CREATE: 'journeycreateJourney' as const,
  JOURNEY_CREATE_STEP: 'journeycreateJourneyStep' as const,
  JOURNEY_HOME: 'journeyhome' as const,
  JOURNEY_LIST: 'journeylist' as const,
  LOGIN: 'login' as const,
  ROBOT: 'robot' as const,
}
/* eslint-enable ts/naming-convention */

export const router = createRouter({
  data: '/data',
  ...createGroup('journey', '/journey', {
    createJourney: '/create-journey',
    createJourneyStep: '/:journeyId/create-journey-step',
    home: '/:journeyId',
    list: '/',
  }),
  login: '/login',
  robot: '/robot',
})

export const useRoute = router.useRoute
