import React from 'react'
import { ThemeProvider } from 'ui'

import { JourneyCreate } from './screens/create-journey'
import { JourneyHome } from './screens/home-journey'
import { JourneyList } from './screens/list-journey'
import { useRoute } from '../../utils/router'

interface RouteParams {
  journeyId?: string
}

interface Route {
  name?: 'journeycreate' | 'journeyhome' | 'journeylist'
  params?: RouteParams
}

function getComponentForRoute(route?: Route) {
  switch (route?.name) {
    case 'journeycreate': {
      return <JourneyCreate />
    }
    case 'journeyhome': {
      return <JourneyHome journeyId={route.params?.journeyId ?? ''} />
    }
    case 'journeylist': {
      return <JourneyList />
    }
    default: {
      return <JourneyList />
    }
  }
}

/**
 * Journey screen.
 */
export function Journey() {
  const route = useRoute(['journeycreate', 'journeyhome', 'journeylist'])
  return (
    <ThemeProvider theme="light">
      {getComponentForRoute(route)}
    </ThemeProvider>
  )
}
