import React from 'react'

import { JourneyCreate } from './screens/create-journey'
import { JourneyList } from './screens/list-journey'
import { useRoute } from '../../utils/router'

/**
 * Journey screen.
 */
export function Journey() {
  const route = useRoute(['journeycreate'])

  switch (route?.name) {
    case 'journeycreate': { return <JourneyCreate /> }
    default: { return <JourneyList /> }
  }
}
