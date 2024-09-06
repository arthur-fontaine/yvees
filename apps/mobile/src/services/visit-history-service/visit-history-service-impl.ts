import { lazyCreateServiceImpl } from 'diabolo'

import type { visitHistoryService } from './visit-history-service'
import { db } from '../../utils/db'

export const visitServiceImpl = lazyCreateServiceImpl<visitHistoryService>(() => ({

    findVisitByUserId: async ({ userId }) => {
        console.warn("Fetching visits for userId:", userId); 
        
        const result = await db.query.visits.findMany({
            where: (visit, { eq }) => eq(visit.userId, userId),
        });
        
        console.warn("Result from database:", result); 
        
        if (!result || result.length === 0) {
            console.warn("No visits found for userId:", userId);
            return [];
        }
    
        return Array.from(result.values());
    },
    
}));
