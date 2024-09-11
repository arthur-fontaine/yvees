import { useClerk } from '@clerk/clerk-react'
import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { museumService } from '../../../services/museum-service/museum-service'
import { serverImpls } from '../../../utils/server-impls'
import type { ChartData, VisitSerialized } from '../types/data'

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
      updatedAt: visit.updatedAt?.toISOString(),
    })) ?? []
  }, serverImpls),
  {
    path: '/get-visits',
  },
)

/**
 *  Hook to get the data for the journey card.
 */
export function useData() {
  const session = useClerk()
  const clerkOrganizationId
   = session.user?.organizationMemberships[0]?.organization.id

  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [user] = useState(session.user)
  useEffect(() => {
    getVisits(clerkOrganizationId).then((visits: VisitSerialized[]) => {
      const realData = visits
      const fakeData = import.meta.env.DEV ? generateFakeVisitsData() : [] // Only generate fake data in development
      const combinedData = [...realData, ...fakeData]
      const formattedData = processVisitsToChartData(combinedData)

      setChartData(formattedData)
      setLoading(false)
    })
  }, [clerkOrganizationId])
  return { chartData, loading, user }
}

/**
 * Process the visits data into chart data.
 */
export function processVisitsToChartData(
  visits: VisitSerialized[],
): ChartData[] {
  const visitsByMonth: { [key: string]: number } = {}

  visits.forEach((visit) => {
    const date = new Date(visit.createdAt)
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`

    if (!visitsByMonth[monthYear]) {
      visitsByMonth[monthYear] = 0
    }

    visitsByMonth[monthYear]++
  })

  const chartData: ChartData[] = Object.keys(visitsByMonth)
    .sort()
    .map((monthYear) => {
      const [year, month] = monthYear.split('-')
      const date = new Date(Number(year), Number(month) - 1)
      const monthName = date.toLocaleString('default', { month: 'long' })

      return {
        month: monthName,
        visits: visitsByMonth[monthYear] || 0, // Assign a default value of 0 if visitsByMonth[monthYear] is undefined
      }
    })

  return chartData
}

// TODO : Remove Fake DATA when script for generate fake exist
function generateFakeVisitsData(): VisitSerialized[] {
  const now = new Date()
  const fakeData: VisitSerialized[] = []

  for (let i = 0; i < 6; i++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthISO = `${monthDate.toISOString().split('T')[0]}T00:00:00Z`

    fakeData.push({
      createdAt: monthISO,
    } as VisitSerialized)
  }

  return fakeData
}
