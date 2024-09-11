import type { Car, Museum, Visit } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

export interface MuseumService extends Service<'museum', {
  createMuseum: (params: { museum: Museum }) => Promise<void>
  findMuseumOfClerkOrg: (
    params: { clerkOrganizationId: string }
  ) => Promise<Museum | undefined>
  getCarsOfMuseum: (params: { museumId: number }) => Promise<Car[]>
  getVisitsOfMuseum: (params: { museumId: number }) => Promise<Visit[]>
  insertNewCarOfMuseum:
  (params: { ip: string, museumId: number }) => Promise<void>
}> { }

export const museumService = createService<MuseumService>('museum')
