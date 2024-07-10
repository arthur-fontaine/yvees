import { lazyCreateServiceImpl } from 'diabolo';

import type { MuseumService } from './museum-service';
import { db } from '../../utils/db';
import { museums } from 'db/schema';


export const museumServiceImpl = lazyCreateServiceImpl<MuseumService>(() => ({  
    
    findMuseumById: async ({ clerkOrganizationId }) => {
        try {
            const result = await db.query.museums.findMany({ where: (museum, { eq }) => eq(museum.clerkOrganizationId, clerkOrganizationId) });
            return result.length > 0 ? result : null;
        } catch (error) {
            console.error(error);
            throw new Error('Error while fetching museum');
        }
    },

    createMuseum: async ({ museum }) => {
        await db.insert(museums).values(museum).returning();
    },
    }));


