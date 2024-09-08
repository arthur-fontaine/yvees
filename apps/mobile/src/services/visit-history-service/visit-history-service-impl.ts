import { db } from 'db/runtime/server'
import { lazyCreateServiceImpl } from 'diabolo'

import type { VisitHistoryService } from './visit-history-service'

export const visitServiceImpl = lazyCreateServiceImpl<VisitHistoryService>(() =>
  ({
    findVisitByUserId: async ({ userId }) => {
      console.error('Fetching visits for userId:', userId)

      const result = await db.query.visits.findMany({
        where: (visit, { eq }) => eq(visit.userId, userId),
      })

      console.error('Result from database:', result)

      if (!result || result.length === 0) {
        console.error('No visits found for userId:', userId)
        return []
      }

      return Array.from(result.values())
    },

  }))
