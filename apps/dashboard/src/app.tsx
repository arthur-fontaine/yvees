import { useClerk } from '@clerk/clerk-react'
import React from 'react'
import { ThemeProvider } from 'ui'

import { Journey } from './screens/journey/journey'
import { Authentification } from './screens/login/authentification'
import { Sidebar } from './shared/components/sidebar'
import { useRoute } from './utils/router'

/**
 * App component.
 */
export function App() {
  const route = useRoute(['login', 'data', 'journeyhome', 'journeycreate', 'robot'])
  const { session } = useClerk()

  if (session?.status !== 'active') {
    return (
      <ThemeProvider theme="light">
        <Authentification />
      </ThemeProvider>
    )
  }
 else {
    switch (route?.name) {
      case 'data': {
        return (
          <ThemeProvider theme="light">
            <Sidebar />
            <div className="pl-40">Data</div>
          </ThemeProvider>
        )
      }

      case 'journeyhome':
      case 'journeycreate': {
        return (
          <ThemeProvider theme="light">
            <Sidebar />
            <div className="pl-40"><Journey /></div>
          </ThemeProvider>
        )
      }

      case 'robot': {
        return (
          <ThemeProvider theme="light">
            <Sidebar />
            <div className="pl-40">robot</div>
          </ThemeProvider>
        )
      }

      default: {
        return (
          <ThemeProvider theme="light">
            <Sidebar />
            <div className="pl-44">Not found</div>
          </ThemeProvider>
        )
      }
    }
  }
}
