import React from 'react'

import { DefaultLayout } from '../../shared/layouts/default-layout'
import { InfoVisit } from './components/info-visits'

/**
 * The session end of mode no competition screen of the application.
 */
export function EndModeNoCompetition() {
  return (
      <DefaultLayout>
        <InfoVisit/>
      </DefaultLayout>
  )
}
