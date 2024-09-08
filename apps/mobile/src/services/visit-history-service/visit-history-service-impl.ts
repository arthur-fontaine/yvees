import { lazyCreateServiceImpl } from 'diabolo'

import type { visitHistoryService } from './visit-history-service'
import { db } from 'db/runtime/server'

export const visitServiceImpl = lazyCreateServiceImpl<visitHistoryService>(() => ({

    findVisitByUserId: async ({ userId }) => {
        console.error("Fetching visits for userId:", userId); 
        
        const result = await db.query.visits.findMany({
            where: (visit, { eq }) => eq(visit.userId, userId),
        });
        
        console.error("Result from database:", result); 
        
        if (!result || result.length === 0) {
            console.error("No visits found for userId:", userId);
            return [];
        }
    
        return Array.from(result.values());
    },
    
}));
