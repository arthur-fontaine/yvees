import type { Journey, JourneyStep } from "db";

import { db } from "db/runtime/server";
import { journeySteps, journeys } from "db/schema";
import { lazyCreateServiceImpl } from "diabolo";
import { eq, getTableColumns, sql } from "drizzle-orm";

import type { JourneyService } from "./journey-service";

export const journeyServiceImpl = lazyCreateServiceImpl<JourneyService>(() => ({
  createJourneyByMuseumId: async ({ clerkOrganizationId, journey }) => {
    const [museum] = await db.query.museums.findMany({
      where: (museum, { eq }) =>
        eq(museum.clerkOrganizationId, clerkOrganizationId),
    });

    const museumId = museum?.id;

    if (museumId === undefined) {
      console.error("Museum not found");
      return;
    }

    const [createdJourney] = await db
      .insert(journeys)
      .values({
        ...journey,
        museumId,
      })
      .returning();

    if (!createdJourney) {
      console.error("Failed to create journey");
      return;
    }
    await db
      .insert(journeySteps)
      .values({
        description: "C'est le début de ton voyage.",
        end: false,
        journeyId: createdJourney.id,
        name: "Début",
        start: true,
      })
      .returning();

    await db
      .insert(journeySteps)
      .values({
        description: "C'est la fin de ton voyage.",
        end: true,
        journeyId: createdJourney.id,
        name: "Fin",
        start: false,
      })
      .returning();
  },

  deleteJourneyById: async ({ journeyId }) => {
    const journey = await db.query.journeys.findFirst({
      where: (journeys, { eq }) => eq(journeys.id, journeyId),
    });

    if (!journey) {
      console.error("Journey not found");
      return;
    }
    await db.delete(journeySteps).where(eq(journeySteps.journeyId, journeyId));
    await db.delete(journeys).where(eq(journeys.id, journeyId));
  },

  findJourneyById: async ({ journeyId }) => {
    const journeyData = await db
      .select({
        ...getTableColumns(db.tables.journeys),
        averageVisitDuration: sql<number>`AVG(${db.tables.visits.endedAt} - ${db.tables.visits.createdAt}) OVER (PARTITION BY ${db.tables.journeys.id})`,
        journeyStepData: db.tables.journeySteps,
        journeyStepId: db.tables.journeySteps.id,
      })
      .from(db.tables.journeys)
      .leftJoin(
        db.tables.journeySteps,
        eq(db.tables.journeys.id, db.tables.journeySteps.journeyId)
      )
      .leftJoin(
        db.tables.visits,
        eq(db.tables.journeys.id, db.tables.visits.journeyId)
      )
      .where(eq(db.tables.journeys.id, Number(journeyId)));

    const journeysMap = new Map<
      number,
      {
        averageVisitDuration: number;
        journeySteps: JourneyStep[];
      } & Journey
    >();

    for (const row of journeyData) {
      const { id, journeyStepData, journeyStepId, ...journeyInfo } = row;

      if (!journeysMap.has(id)) {
        journeysMap.set(id, {
          id,
          ...journeyInfo,
          journeySteps: [],
        });
      }

      if (journeyStepData) {
        journeysMap.get(id)!.journeySteps.push(journeyStepData);
      }
    }

    return Array.from(journeysMap.values())[0] || undefined;
  },

  findJourneysByMuseumId: async ({ clerkOrganizationId }) => {
    try {
      const [museum] = await db.query.museums.findMany({
        where: (museum, { eq }) =>
          eq(museum.clerkOrganizationId, clerkOrganizationId),
      });
      const museumId = museum?.id;

      if (museumId === undefined) {
        return [];
      }
      const journeyData = await db
        .select({
          ...getTableColumns(db.tables.journeys),
          averageVisitDuration: sql<number>`AVG(${db.tables.visits.endedAt} - ${db.tables.visits.createdAt}) OVER (PARTITION BY ${db.tables.journeys.id})`,
          journeyStepData: db.tables.journeySteps,
          journeyStepId: db.tables.journeySteps.id,
        })
        .from(db.tables.journeys)
        .leftJoin(
          db.tables.journeySteps,
          eq(db.tables.journeys.id, db.tables.journeySteps.journeyId)
        )
        .leftJoin(
          db.tables.visits,
          eq(db.tables.journeys.id, db.tables.visits.journeyId)
        )
        .where(eq(db.tables.journeys.museumId, museumId));

      const journeysMap = new Map<
        number,
        {
          averageVisitDuration: number;
          journeySteps: JourneyStep[];
        } & Journey
      >();

      for (const row of journeyData) {
        const { id, journeyStepData, journeyStepId, ...journeyInfo } = row;

        if (!journeysMap.has(id)) {
          journeysMap.set(id, {
            id,
            ...journeyInfo,
            journeySteps: [],
          });
        }

        if (journeyStepData) {
          journeysMap.get(id)!.journeySteps.push(journeyStepData);
        }
      }
      return Array.from(journeysMap.values());
    } catch (error) {
      console.error("Error in findJourneysByMuseumId", error);
      throw error;
    }
  },
}));
