import React from 'react'
import { ThemeProvider } from 'ui'

import { JourneyCreate } from './screens/create-journey'
import { JourneyList } from './screens/list-journey'
import { useRoute } from '../../utils/router'

/**
 * Journey screen.
 */
export function Journey() {
  const route = useRoute(['journeycreate'])
  switch (route?.name) {
    case 'journeycreate': {
      return (
          <ThemeProvider theme="light">
              <JourneyCreate />
          </ThemeProvider>
      )
    }
    default: {
      return (
          <ThemeProvider theme="light">
              <JourneyList />
          </ThemeProvider>
      )
    }
  }
}
