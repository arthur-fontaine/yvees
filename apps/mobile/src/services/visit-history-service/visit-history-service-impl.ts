import { db } from 'db/runtime/server'
import { lazyCreateServiceImpl } from 'diabolo'
import type { VisitHistoryService } from './visit-history-service'

export const visitServiceImpl = lazyCreateServiceImpl<VisitHistoryService>(() =>
  ({
    findVisitByUserId: async ({ userId }) => {

      const result = await db.query.visits.findMany({
        where: (visit, { eq }) => eq(visit.userId, userId),
        with: {
          journey: {
            with: {
              museum: true, 
            }
          }
        }
      })

      console.error('Result from database:', result)

      if (!result || result.length === 0) {
        console.error('No visits found for userId:', userId)
        return []
      }

      return result.map(visit => ({
        ...visit,
        journey: visit.journey, 
        museum: visit.journey.museum 
      }));
    },
  }))
