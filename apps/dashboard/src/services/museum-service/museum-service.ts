import type { Car, Museum } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

export interface MuseumService extends Service<'museum', {
  createMuseum: (params: { museum: Museum }) => Promise<void>
  findMuseumOfClerkOrg: (
    params: { clerkOrganizationId: string }
  ) => Promise<Museum | undefined>
  getCarsOfMuseum: (params: { museumId: number }) => Promise<Car[]>
}> { }

export const museumService = createService<MuseumService>('museum')
