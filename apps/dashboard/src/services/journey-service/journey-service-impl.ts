import { db } from 'db/runtime/server'
import { journeySteps, journeys } from 'db/schema'
import { lazyCreateServiceImpl } from 'diabolo'
import { and, eq, getTableColumns, sql } from 'drizzle-orm'

import type { JourneyService } from './journey-service'

export const journeyServiceImpl = lazyCreateServiceImpl<JourneyService>(() => ({
  createJourneyByMuseumId: async ({ clerkOrganizationId, journey }) => {
    const [museum] = await db.query.museums.findMany({
      where: (museum, { eq }) =>
        eq(museum.clerkOrganizationId, clerkOrganizationId),
    })

    const museumId = museum?.id

    if (museumId === undefined) {
      console.error('Museum not found')
      return
    }

    const [createdJourney] = await db
      .insert(journeys)
      .values({
        ...journey,
        museumId,
      })
      .returning()

    if (!createdJourney) {
      console.error('Failed to create journey')
      return
    }

    await db.insert(journeySteps).values([
      {
        description: 'C\'est le début de ton voyage.',
        end: false,
        journeyId: createdJourney.id,
        name: 'Début',
        start: true,
      },
      {
        description: 'C\'est la fin de ton voyage.',
        end: true,
        journeyId: createdJourney.id,
        name: 'Fin',
        start: false,
      },
    ])
  },

  deleteJourneyById: async ({ journeyId }) => {
    const journey = await db.query.journeys.findFirst({
      where: (journeys, { eq }) => eq(journeys.id, journeyId),
    })

    if (!journey) {
      console.error('Journey not found')
      return
    }
    await db
      .update(journeys)
      .set({ archived: true })
      .where(eq(journeys.id, journeyId))
  },

  findJourneyById: async ({ journeyId }) => {
    return await db
      .selectDistinct({
        averageVisitDuration: sql<number>`AVG(${db.tables.visits.endedAt} - ${db.tables.visits.createdAt}) OVER (PARTITION BY ${db.tables.journeys.id})`,
        ...getTableColumns(db.tables.journeys),
        journeySteps: db.tables.journeySteps,
      })
      .from(db.tables.journeys)
      .where(eq(db.tables.journeys.id, Number(journeyId)))
      .leftJoin(
        db.tables.visits,
        eq(db.tables.visits.journeyId, db.tables.journeys.id),
      )
      .leftJoin(
        db.tables.journeySteps,
        eq(db.tables.journeySteps.journeyId, db.tables.journeys.id),
      )
      .then(journeys => (journeys[0] && {
        ...journeys[0],
        journeySteps: journeys.flatMap(journey => journey.journeySteps || []),
      }))
  },

  findJourneysByMuseumId: async ({ clerkOrganizationId }) => {
    return await db
      .selectDistinct({
        averageVisitDuration: sql<number>`AVG(${db.tables.visits.endedAt} - ${db.tables.visits.createdAt}) OVER (PARTITION BY ${db.tables.journeys.id})`,
        description: db.tables.journeys.description,
        id: db.tables.journeys.id,
        name: db.tables.journeys.name,
        numberOfSteps: sql<number>`(SELECT COUNT(*) FROM ${db.tables.journeySteps} WHERE ${db.tables.journeySteps.journeyId} = ${db.tables.journeys.id})`,
      })
      .from(db.tables.journeys)
      .where(and(
        eq(db.tables.museums.clerkOrganizationId, clerkOrganizationId),
        eq(db.tables.journeys.archived, false),
      ))
      .leftJoin(
        db.tables.museums,
        eq(db.tables.museums.id, db.tables.journeys.museumId),
      )
      .leftJoin(
        db.tables.visits,
        eq(db.tables.visits.journeyId, db.tables.journeys.id),
      )
      .leftJoin(
        db.tables.journeySteps,
        eq(db.tables.journeySteps.journeyId, db.tables.journeys.id),
      )
  },

  updateJourneyControlMode: async ({ controlMode, journeyId }) => {
    const journey = await db.query.journeys.findFirst({
      where: (journeys, { eq }) => eq(journeys.id, journeyId),
    })

    if (!journey) {
      console.error('Journey not found')
      return
    }
    await db
      .update(journeys)
      .set({ controlMode })
      .where(eq(journeys.id, journeyId))
  },
}))
