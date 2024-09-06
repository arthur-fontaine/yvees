import { useClerk } from '@clerk/clerk-react'
import { createGroup, createRouter } from '@swan-io/chicane'
import React from 'react'
import { ThemeProvider } from 'ui'

import { Journey } from '../screens/journey/journey'
import { Authentication } from '../screens/login/authentication'
import { Robot } from '../screens/robot/robot'
import { Sidebar } from '../shared/components/sidebar'

/* eslint-disable ts/naming-convention */
export const RouteNames = {
  DATA: 'data' as const,
  JOURNEY_CREATE: 'journeycreateJourney' as const,
  JOURNEY_CREATE_STEP: 'journeycreateJourneyStep' as const,
  JOURNEY_HOME: 'journeyhome' as const,
  JOURNEY_LIST: 'journeylist' as const,
  LOGIN: 'login' as const,
  ROBOT_CONFIGURE: 'robotconfigure' as const,
  ROBOT_HOME: 'robothome' as const,
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
  ...createGroup('robot', '/robot', {
    configure: '/configure',
    home: '/',
  }),
})

export const useRoute = router.useRoute

/**
 * Router component.
 */
export function Router() {
  const route = useRoute(Object.values(RouteNames))
  const { session } = useClerk()

  if (session?.status !== 'active') {
    return <Authentication />
  }

  function getRoute() {
    switch (route?.name) {
      case 'data': { return <div>Data</div> }
      case 'journeyhome':
      case 'journeylist':
      case 'journeycreateJourneyStep':
      case 'journeycreateJourney': { return <Journey /> }
      case 'robothome':
      case 'robotconfigure': { return <Robot /> }
      default: { return <div>Not found</div> }
    }
  }

  return (
      <ThemeProvider theme="light">
          <Sidebar />
          <div className="pl-40">
              {getRoute()}
          </div>
      </ThemeProvider>
  )
}
