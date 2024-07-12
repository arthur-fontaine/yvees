import { useClerk } from '@clerk/clerk-react'
import { createRoute } from 'agrume'
import type { Journey } from 'db'
import * as DI from 'diabolo'
import { useState } from 'react'

import { journeyService } from '../../../services/journey-service/journey-service'
import { serverImpls } from '../../../utils/server-impls'
import type { JourneyForm } from '../types/create-journey'

const insertJourney = createRoute(
  DI.provide(
    async function* ({
      clerkOrganizationId,
      journey,
    }: {
      clerkOrganizationId: string
      journey: JourneyForm
    }) {
      const { createJourneyByMuseumId } = yield * DI.requireService(
        journeyService,
      )
      await createJourneyByMuseumId({ clerkOrganizationId, journey })
      return { success: true }
    },
    serverImpls,
  ),
  {
    path: '/insert-journey',
  },
)

/**
 * Hook to insert a journey.
 */
export function useInsertJourney() {
  const session = useClerk()
  const clerkOrganizationId = session.user?.organizationMemberships[0]
    ?.organization.id
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const insertNewJourney = async (journey: JourneyForm): Promise<void> => {
    if (!clerkOrganizationId) {
      setError('No organization ID found')
      return
    }

    setLoading(true)
    setError(undefined)

    try {
      await insertJourney({ clerkOrganizationId, journey })
      setLoading(false)
    }
 catch (err) {
      setError('Failed to insert journey')
      setLoading(false)
    }
  }

  return { error, insertNewJourney, loading }
}
