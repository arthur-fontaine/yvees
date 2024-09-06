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

  insertNewCarOfMuseum: async ({ ip, museumId }) => {
    await db.insert(db.tables.cars).values({
      battery: 100, // TODO: get real value
      ip,
      museumId,
    }).returning()
  },
}))
