import { useClerk } from '@clerk/clerk-react'
import React from 'react'
import { ThemeProvider } from 'ui'

import { Journey } from './screens/journey/journey'
import { Authentication } from './screens/login/authentication'
import { Sidebar } from './shared/components/sidebar'
import { RouteNames, useRoute } from './utils/router'

/**
 * App.
 */
export function App() {
  const route = useRoute(Object.values(RouteNames))
  const { session } = useClerk()

  const isAuthenticated = session?.status === 'active'

  const renderContent = () => {
    if (!isAuthenticated) {
      return <Authentication />
    }

    switch (route?.name) {
      case RouteNames.DATA: {
        return <div className="pl-40">Data</div>
      }

      case RouteNames.ROBOT: {
        return <div className="pl-40">robot</div>
      }

      case RouteNames.JOURNEY_HOME:
      case RouteNames.JOURNEY_LIST:
      case RouteNames.JOURNEY_CREATE:
      case RouteNames.JOURNEY_CREATE_STEP: {
        return <Journey />
      }

      default: {
        return <div className="pl-44">Not found</div>
      }
    }
  }

  return (
      <ThemeProvider theme="light">
          <Sidebar />
          <div className="pl-40">
              {renderContent()}
          </div>
      </ThemeProvider>
  )
}
