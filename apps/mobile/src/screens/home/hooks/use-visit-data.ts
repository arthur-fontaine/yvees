import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useEffect, useState } from 'react'

import { visitHistoryService } from '../../../services/visit-history-service/visit-history-service'
import { serverImpls } from '../../../utils/server-impl'
import type { VisitByUserIdSerialized } from '../types/visit'
import { console } from 'inspector'

export const getVisitsByUserId = createRoute(
    DI.provide(async function* (userId: number | undefined) {
        if (!userId) {
            return []
        }
        const { findVisitByUserId } = yield* DI.requireService(visitHistoryService)
        console.warn("Service findVisitByUserId:", findVisitByUserId);

        const visits = await findVisitByUserId({ userId })
        return visits?.map((visit) => {
        return {
            ...visit,
            createdAt: visit.createdAt?.toISOString(),
            updatedAt: visit.updatedAt?.toISOString(),
        } })
    }, serverImpls),
    {
        path: '/get-visits',
    },
)

/**
 *  Hook to get the data for the journey card.
 */

export function useVisitData() {
    const [visit, setVisit] = useState<VisitByUserIdSerialized[] | undefined>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        try{
            const userId = 0
            getVisitsByUserId(userId).then((visit: VisitByUserIdSerialized[]) => {
                setVisit(visit)
                setLoading(false)
            })
        }

        catch{
            console.warn('error')
        }

    }, [])
    return { visit, loading }
};
