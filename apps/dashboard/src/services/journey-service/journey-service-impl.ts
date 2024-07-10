import { lazyCreateServiceImpl } from 'diabolo';
import { eq, getTableColumns, sql } from 'drizzle-orm';

import type { JourneyService } from './journey-service';
import { db } from '../../utils/db';
import { journeys } from 'db/schema';
import type { Journey, JourneyStep } from 'db'

export const journeyServiceImpl = lazyCreateServiceImpl<JourneyService>(() => ({

  findJourneysStepsByMuseumId: async ({ clerkOrganizationId }) => {
    const [museum] = await db.query.museums.findMany({
      where: (museum, { eq }) => eq(museum.clerkOrganizationId, clerkOrganizationId),
    })
    console.info("museum", museum)
    const museumId = museum?.id
  
    if (museumId === undefined) {
      return [];
    }
    
    const journeyData = await db
      .select({
        ...getTableColumns(db.tables.journeys),
        journeyStepId: db.tables.journeySteps.id,
        journeyStepData: db.tables.journeySteps,
        averageVisitDuration: sql<number>`AVG(${db.tables.visits.endedAt} - ${db.tables.visits.createdAt}) OVER (PARTITION BY ${db.tables.journeys.id})`,
      })
      .from(db.tables.journeys)
      .leftJoin(db.tables.journeySteps, eq(db.tables.journeys.id, db.tables.journeySteps.journeyId))
      .leftJoin(db.tables.visits, eq(db.tables.journeys.id, db.tables.visits.journeyId))
      .where(eq(db.tables.journeys.museumId, museumId));

    const journeysMap = new Map<number, { averageVisitDuration: number; journeySteps: JourneyStep[]; } & Journey>();

    for (const row of journeyData) {
      const { id, journeyStepId, journeyStepData, ...journeyInfo } = row;

      if (!journeysMap.has(id)) {
        journeysMap.set(id, {
          id: id,
          ...journeyInfo,
          journeySteps: [],
        });
      }

      if (journeyStepData) {
        journeysMap.get(id)!.journeySteps.push(journeyStepData);
      }
    }

    return Array.from(journeysMap.values());
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


