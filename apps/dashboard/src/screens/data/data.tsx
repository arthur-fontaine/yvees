import { useClerk } from '@clerk/clerk-react'
import React from 'react'

import { ChartVisits } from './components/charts-visits'

/**
 * Data screen.
 */
export function Data() {
    const session = useClerk()
    const user = session.user

    return (
        <div className="h-screen p-10">
            <h1 className="text-3xl font-bold my-8">
                Bienvenue sur les données de ton musée
                {' '}
                {user?.username ?? ''}
                {' '}
                :
            </h1>
            <ChartVisits />
        </div>
    )
}
