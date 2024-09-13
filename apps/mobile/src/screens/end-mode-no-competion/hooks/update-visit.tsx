import { createRoute } from 'agrume'
import * as DI from 'diabolo'

import { visitService } from '../../../shared/services/visit-service/visit-service'
import { serverImpls } from '../../../shared/utils/server-impls'

export const updateVisit = createRoute(
    DI.provide(async function* (id: number) {
        if (id === undefined) {
            return { message: 'Invalid visitId', success: false }
        }
        const { updateVisit } = yield * DI.requireService(visitService)
        await updateVisit({ id })
        return { success: true }
    }, serverImpls),
    {
        path: '/update-visit/:visitId/:endedAt',
    },
)
