import { db } from 'db/runtime/server'
import { museums } from 'db/schema'
import { lazyCreateServiceImpl } from 'diabolo'

import type { MuseumService } from './museum-service'

export const museumServiceImpl = lazyCreateServiceImpl<MuseumService>(() => ({

  createMuseum: async ({ museum }) => {
    await db.insert(museums).values(museum).returning()
  },

  findMuseumById: async ({ clerkOrganizationId }) => {
    if (!clerkOrganizationId) {
      return undefined
    }
    const result = await db.query.museums.findMany({
      where: (museum, { eq }) => eq(
        museum.clerkOrganizationId,
        clerkOrganizationId,
      ),
    })
    return result.length > 0 ? result : undefined
  },
}))
