import { db } from 'db/runtime/server'
import { lazyCreateServiceImpl } from 'diabolo'
import { eq, getTableColumns, sql } from 'drizzle-orm'

import type { EndModeNoCompetitionService } from './end-mode-no-competition-service'

export const journeyServiceImpl
= lazyCreateServiceImpl<EndModeNoCompetitionService>(() => ({
  getVisitById : async ({ visitId }) => {
    return await db
      .selectDistinct({
        ...getTableColumns(db.tables.visits),
        journey: db.tables.journeys,
        journeySteps: db.tables.journeySteps,
        numberOfSteps: sql<number>`(SELECT COUNT(*) FROM ${db.tables.journeySteps} WHERE ${db.tables.journeySteps.journeyId} = ${db.tables.journeys.id})`,
      })
      .from(db.tables.visits)
      .where(eq(db.tables.visits.id, Number(visitId)))
      .leftJoin(
        db.tables.journeys,
        eq(db.tables.visits.journeyId, db.tables.journeys.id),
      )
      .leftJoin(
        db.tables.journeySteps,
        eq(db.tables.journeys.id, db.tables.journeySteps.journeyId),
      )
      .then(visits => (visits[0] && {
        ...visits[0],
        journey: visits.flatMap(visit => visit.journey),
        journeySteps: visits.flatMap(visit => visit.journeySteps || []),
      }))
  },
}))
