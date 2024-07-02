import { lazyCreateServiceImpl } from 'diabolo'
import { eq } from 'drizzle-orm'

import type { JourneyService } from './journey-service'
import { db } from '../../utils/db'

export const journeyServiceImpl = lazyCreateServiceImpl<JourneyService>(() => ({
  findJourneysByMuseumId: ({ museumId }) =>
    db.query.journeys.findMany({
      extras: (journey, { sql }) => ({
        averageVisitDuration: db
          .select({
            averageVisitDuration:
              sql<number>`AVG(${db.tables.visits.endedAt} - ${db.tables.visits.createdAt})`
                .as('averageVisitDuration'),
          })
          .from(db.tables.visits)
          .where(eq(db.tables.visits.journeyId, journey.id))
          .as('averageVisitDuration')
          .averageVisitDuration,
      }),
      where: (users, { eq }) => eq(users.museumId, museumId),
      with: {
        journeySteps: true,
      },
    }),
}))
