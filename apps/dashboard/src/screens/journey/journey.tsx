import React from 'react'
import { ThemeProvider } from 'ui'

import { JourneyCreate } from './screens/create-journey'
import { JourneyHome } from './screens/home-journey'
import { JourneyList } from './screens/list-journey'
import { JourneyStepCreate } from './screens/create-journey-step'
import { useRoute } from '../../utils/router'

interface RouteParams {
  journeyId?: string
}

interface Route {
  name?: 'journeycreateJourney' | 'journeycreateJourneyStep' | 'journeyhome' | 'journeylist' 
  params?: RouteParams
}

function getComponentForRoute(route?: Route) {
  console.log(route)
  switch (route?.name) {
    case 'journeycreateJourney': {
      return <JourneyCreate />
    }
    case 'journeycreateJourneyStep': {
      return <JourneyStepCreate journeyId={route.params?.journeyId ?? ''} />
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
  const route = useRoute(['journeycreateJourney', 'journeyhome', 'journeylist', 'journeycreateJourneyStep'])
  return (
    <ThemeProvider theme="light">
      {getComponentForRoute(route)}
    </ThemeProvider>
  )
}
