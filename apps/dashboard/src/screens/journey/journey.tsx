import React from 'react'
import { ThemeProvider } from 'ui'

import { JourneyCreate } from './screens/create-journey'
import { JourneyStepCreate } from './screens/create-journey-step'
import { JourneyHome } from './screens/home-journey'
import { JourneyList } from './screens/list-journey'
import { RouteNames, useRoute } from '../../utils/router'

interface RouteParams {
  journeyId?: string
}

interface Route {
  name?: 'journeycreateJourney' | 'journeycreateJourneyStep' | 'journeyhome' | 'journeylist'
  params?: RouteParams
}

function getComponentForRoute(route?: Route) {
  switch (route?.name) {
    case RouteNames.JOURNEY_CREATE: {
      return <JourneyCreate />
    }
    case RouteNames.JOURNEY_CREATE_STEP: {
      return <JourneyStepCreate journeyId={route.params?.journeyId ?? ''} />
    }
    case RouteNames.JOURNEY_HOME: {
      return <JourneyHome journeyId={route.params?.journeyId ?? ''} />
    }
    case RouteNames.JOURNEY_LIST: {
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
  const route = useRoute([
    RouteNames.JOURNEY_CREATE,
    RouteNames.JOURNEY_HOME,
    RouteNames.JOURNEY_CREATE_STEP,
    RouteNames.JOURNEY_LIST,
  ])
  return (
      <ThemeProvider theme="light">
          {getComponentForRoute(route)}
      </ThemeProvider>
  )
}
