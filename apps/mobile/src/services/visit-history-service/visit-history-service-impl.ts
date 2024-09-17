import { db } from 'db/runtime/server'
import { lazyCreateServiceImpl } from 'diabolo'
import { eq, getTableColumns } from 'drizzle-orm'

import type { VisitHistoryService } from './visit-history-service'

export const visitServiceImpl = lazyCreateServiceImpl<VisitHistoryService>(() =>
  ({
    findVisitByClerkUserId: async ({ clerckUserId }) => {
      const results = await db
        .selectDistinct({
          ...getTableColumns(db.tables.visits),
          journey: db.tables.journeys,
          museum: db.tables.museums,
        })
        .from(db.tables.visits)
        .where(
          eq(db.tables.users.clerkUserId, clerckUserId),
        )
        .leftJoin(
          db.tables.users,
          eq(db.tables.visits.userId, db.tables.users.id),
        )
        .leftJoin(
          db.tables.journeys,
          eq(db.tables.journeys.id, db.tables.visits.journeyId),
        )
        .leftJoin(
          db.tables.museums,
          eq(db.tables.museums.id, db.tables.journeys.museumId),
        )

      return results.map(result => ({
        ...result,
        journey: result.journey ?? undefined,
        museum: result.museum ?? undefined,
      }))
    },
  }))
