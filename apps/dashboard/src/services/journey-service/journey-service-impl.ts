import { lazyCreateServiceImpl } from 'diabolo';
import { eq } from 'drizzle-orm';

import type { JourneyService } from './journey-service';
import { db } from '../../utils/db';
import { journeys } from 'db/schema';
// import { seedData } from '../scripts/db-insert-museum';


export const journeyServiceImpl = lazyCreateServiceImpl<JourneyService>(() => ({

  
  findJourneysByMuseumId: async ({ clerkOrganizationId }) => {
    // seedData();
    const [museum] = await db.query.museums.findMany({
      where: (museum, { eq }) => eq(museum.clerkOrganizationId, clerkOrganizationId),
    })
    const museumId = museum?.id

    if(museumId !== undefined){ 
      return db.query.journeys.findMany({
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
        where: (journey, { eq }) => eq(journey.museumId, museumId),
        with: {
          journeySteps: true,
        },
      })
    }
    return null
  },
  
  createJourneyByMuseumId: async ({ clerkOrganizationId, journey }) => {
    const [museum] = await db.query.museums.findMany({
      where: (museum, { eq }) => eq(museum.clerkOrganizationId, clerkOrganizationId),
    })
    const museumId = museum?.id

    if (museumId === undefined) {
      throw new Error('Museum not found', museumId);
    }

    if(museumId !== undefined){ 
    await db.insert(journeys).values({
      ...journey,
      museumId: museumId,
    }).returning();
    }
  },
}));


