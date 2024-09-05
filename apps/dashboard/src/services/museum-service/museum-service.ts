import type { Museum } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'

export interface MuseumService extends Service<'museum', {
  createMuseum: (params: { museum: Museum }) => Promise<void>
  findMuseumById: (
    params: { clerkOrganizationId: string }
  ) => Promise<Museum[] | undefined>
}> {}

export const museumService = createService<MuseumService>('museum')
