import { lazyCreateServiceImpl } from 'diabolo';
// import { eq } from 'drizzle-orm';

import type { MuseumService } from './museum-service';
import { db } from '../../utils/db';
import { museums } from 'db/schema';


export const museumServiceImpl = lazyCreateServiceImpl<MuseumService>(() => ({    
    //return error if museum not found
    findMuseumById: async ({ clerkOrganizationId }) => {
        return db.query.museums.findMany({ where: (museum, { eq }) => eq(museum.clerkOrganizationId, clerkOrganizationId) });
    },

    createMuseum: async ({ museum }) => {
        await db.insert(museums).values(museum).returning();
    },
    }));


