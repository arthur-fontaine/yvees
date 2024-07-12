import { useClerk } from '@clerk/clerk-react'
import { createRoute } from 'agrume'
import type { Journey } from 'db'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { journeyService } from '../../../services/journey-service/journey-service'
import { serverImpls } from '../../../utils/server-impls'
// import type { JourneySerialized } from '../types/data-card'

interface JourneyTest {
  // createAt: number
  description: string
  draft: boolean
  name: string
  // updatedAt: number
}

const insertJourney = createRoute(
  DI.provide(
    async function* ({
      clerkOrganizationId,
      journey,
    }: {
      clerkOrganizationId: string
      journey: JourneyTest
    }) {
      console.info(yield * DI.requireService(journeyService), (yield * DI.requireService(journeyService)).createJourneyByMuseumId.toString(), (yield * DI.requireService(journeyService)).findJourneysByMuseumId.toString(), 'Wtf ?')
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

  const insertNewJourney = async (journey: Journey): Promise<void> => {
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
