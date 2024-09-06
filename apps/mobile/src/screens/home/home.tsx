import React from 'react'

import { JoinCard } from './components/join-card'
import { DefaultLayout } from '../../shared/layouts/default-layout'

/**
 * The home screen of the application.
 */
export function HomeScreen() {
  return (
      <DefaultLayout>
          <JoinCard />
      </DefaultLayout>
  )
}
