import { db } from 'db/runtime/server'
import { museums } from 'db/schema'
import { lazyCreateServiceImpl } from 'diabolo'

import type { MuseumService } from './museum-service'

export const museumServiceImpl = lazyCreateServiceImpl<MuseumService>(() => ({

  createMuseum: async ({ museum }) => {
    await db.insert(museums).values(museum).returning()
  },

  findMuseumOfClerkOrg: async ({ clerkOrganizationId }) => {
    if (!clerkOrganizationId) {
      return undefined
    }
    const [result] = await db.query.museums.findMany({
      where: (museum, { eq }) => eq(
        museum.clerkOrganizationId,
        clerkOrganizationId,
      ),
    })
    return result
  },

  getCarsOfMuseum(params) {
    return db.query.cars.findMany({
      where: (car, { eq }) => eq(car.museumId, params.museumId),
    })
  },

  getVisitsOfMuseum: async ({ museumId }) => {
    const journeysForMuseum = await db.query.journeys.findMany({
      where: (journey, { eq }) => eq(journey.museumId, museumId),
    })
    const journeyIds = journeysForMuseum.map(journey => journey.id)

    if (journeyIds.length === 0) {
      return []
    }

    const visitsOfMuseum = await db.query.visits.findMany({
      where: (visit, { inArray }) => inArray(visit.journeyId, journeyIds),
    })

    return visitsOfMuseum
  },

  insertNewCarOfMuseum: async ({ ip, museumId }) => {
    await db.insert(db.tables.cars).values({
      battery: 100,
      ip,
      museumId,
    }).returning()
  },
}))
