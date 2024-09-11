import { db } from 'db/runtime/server'
import { journeySteps, journeys } from 'db/schema'
import { lazyCreateServiceImpl } from 'diabolo'
import { eq, sql } from 'drizzle-orm'

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
    const journey = await db.query.journeys.findFirst({
      extras: {
        averageVisitDuration: sql<number>`AVG(${db.tables.visits.endedAt} - ${db.tables.visits.createdAt}) OVER (PARTITION BY ${db.tables.journeys.id})`.as('averageVisitDuration'),
      },
      where: (journeys, { eq }) => eq(journeys.id, Number(journeyId)),
      with: {
        journeySteps: true,
        visits: {
          columns: { createdAt: true, endedAt: true },
        },
      },
    })

    if (!journey) {
      console.error('Journey not found')
      return
    }

    const { visits, ..._journey } = journey
    return _journey
  },

  findJourneysByMuseumId: async ({ clerkOrganizationId }) => {
    const journeys = await db.query.journeys.findMany({
      columns: {
        description: true,
        id: true,
        name: true,
      },
      extras: {
        averageVisitDuration: sql<number>`AVG(${db.tables.visits.endedAt} - ${db.tables.visits.createdAt}) OVER (PARTITION BY ${db.tables.journeys.id})`.as('averageVisitDuration'),
      },
      where: (_, { eq }) =>
        eq(db.tables.museums.clerkOrganizationId, clerkOrganizationId),
      with: {
        journeySteps: { columns: { id: true } },
        museum: { columns: { clerkOrganizationId: true } },
      },
    })

    return journeys.map((journey) => {
      const { journeySteps, museum, ..._journey } = journey
      return {
        ..._journey,
        numberOfSteps: journeySteps.length,
      }
    })
  },
}))
