import { useClerk } from '@clerk/clerk-react'
import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { museumService } from '../../../services/museum-service/museum-service'
import { serverImpls } from '../../../utils/server-impls'

/**
 * Route to find journey by museum ID.
 */
export const getVisits = createRoute(
  DI.provide(async function* (clerkOrganizationId: string | undefined) {
    if (!clerkOrganizationId) {
      return []
    }

    const {
      findMuseumOfClerkOrg,
      getVisitsOfMuseum,
    } = yield * DI.requireService(museumService)

    const museum = await findMuseumOfClerkOrg({ clerkOrganizationId })

    if (museum === undefined) {
      // eslint-disable-next-line fp/no-throw
      throw new Error('No museum found')
    }
    const visits = await getVisitsOfMuseum({ museumId: museum.id })
    return visits?.map(visit => ({
      ...visit,
      createdAt: visit.createdAt?.toISOString(),
      museumId: museum.id,
      updatedAt: visit.updatedAt?.toISOString(),
    })) ?? []
  }, serverImpls),
)

/**
 *  Hook to get the data for the journey card.
 */
export function useVisitsData() {
  const session = useClerk()
  const clerkOrganizationId
    = session.user?.organizationMemberships[0]?.organization.id

  const [chartData, setChartData]
    = useState<ReturnType<typeof processVisitsToChartData>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVisits(clerkOrganizationId).then((visits) => {
      const fakeVisits = import.meta.env.DEV ? generateFakeVisitsData() : [] // Only generate fake data in development
      const combinedData = [...visits, ...fakeVisits]
      const formattedData = processVisitsToChartData(combinedData)

      setChartData(formattedData)
      setLoading(false)
    })
  }, [clerkOrganizationId])

  return { chartData, loading }
}

/**
 * Process the visits data into chart data.
 */
export function processVisitsToChartData(visitDates: { createdAt: string }[]) {
  const visitsByMonth = new Map<string, number>()

  visitDates.forEach(({ createdAt: visitDate }) => {
    const date = new Date(visitDate)
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`
    const currentVisits = visitsByMonth.get(monthYear) || 0
    visitsByMonth.set(monthYear, currentVisits + 1)
  })

  const chartData = Object.keys(visitsByMonth)
    .sort()
    .map((monthYear) => {
      const [year, month] = monthYear.split('-')
      const date = new Date(Number(year), Number(month) - 1)
      const monthName = date.toLocaleString('default', { month: 'long' })

      return {
        month: monthName,
        visits: visitsByMonth.get(monthYear) || 0,
      }
    })

  return chartData
}

function generateFakeVisitsData(): { createdAt: string }[] {
  const now = new Date()
  const fakeData = []

  for (let i = 0; i < 6; i++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthISO = `${monthDate.toISOString().split('T')[0]}T00:00:00Z`
    fakeData.push({ createdAt: monthISO })
  }

  return fakeData
}
