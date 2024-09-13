import React from 'react'

import { InfoVisit } from './components/info-visits'
import { DefaultLayout } from '../../shared/layouts/default-layout'

/**
 * The session end of mode no competition screen of the application.
 */
export function EndModeNoCompetition() {
  return (
      <DefaultLayout>
          <InfoVisit />
      </DefaultLayout>
  )
}
