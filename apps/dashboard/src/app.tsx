import React from 'react'
import { ThemeProvider } from 'ui'

import { Authentification } from './screens/login/authentification'
import { Sidebar } from './shared/components/sidebar'
import { useRoute } from './utils/router'

/**
 * App component.
 */
export function App() {
  const route = useRoute(['login', 'data', 'journey', 'robot'])

  switch (route?.name) {
    case 'login': {
      return (
        <ThemeProvider theme="light">
          <Authentification />
        </ThemeProvider>
      )
    }
    case 'data': {
      return (
        <ThemeProvider theme="light">
          <Sidebar />
          <div className="pl-36">Data</div>
        </ThemeProvider>
      )
    }

    case 'journey': {
      return (
        <ThemeProvider theme="light">
          <Sidebar />
          <div className="pl-36">journey</div>
        </ThemeProvider>
      )
    }

    case 'robot': {
      return (
        <ThemeProvider theme="light">
          <Sidebar />
          <div className="pl-36">robot</div>
        </ThemeProvider>
      )
    }

    default: {
      return (
        <ThemeProvider theme="light">
          <div>Not found</div>
        </ThemeProvider>
      )
    }
  }
}
