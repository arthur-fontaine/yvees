import type { Museum } from 'db'
import type { Service } from 'diabolo'
import { createService } from 'diabolo'


export interface MuseumService extends Service<'museum', {
    findMuseumById: (params: { clerkOrganizationId: string }) => Promise<Museum[] | null>,
    createMuseum: (params: { museum: Museum }) => Promise<void>
    }> {}

export const museumService = createService<MuseumService>('museum')