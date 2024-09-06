import { useClerk } from '@clerk/clerk-react'
import { createGroup, createRouter } from '@swan-io/chicane'
import React from 'react'
import { ThemeProvider } from 'ui'

import { Journey } from '../screens/journey/journey'
import { Authentication } from '../screens/login/authentication'
import { Robot } from '../screens/robot/robot'
import { Sidebar } from '../shared/components/sidebar'

export const router = createRouter({
  data: '/data',
  ...createGroup('journey', '/journey', {
    create: '/create',
    home: '/',
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
  const route = useRoute([
    'login',
    'data',
    'journeyhome',
    'journeycreate',
    'robothome',
    'robotconfigure',
  ])
  const { session } = useClerk()

  if (session?.status !== 'active') {
    return <Authentication />
  }

  function getRoute() {
    switch (route?.name) {
      case 'data': { return <div>Data</div> }
      case 'journeyhome':
      case 'journeycreate': { return <Journey /> }
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
