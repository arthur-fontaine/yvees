import React from 'react'
import { Button, Icon } from 'ui'

import { RouteNames, router } from '../../../utils/router'
import { JourneyCards } from '../components/journey-cards'

/**
 * Journey List screen.
 */
export function JourneyList() {
    return (
        <>
            <div className="h-screen p-10">
                <div className="flex justify-between my-8">
                    <h1 className="text-3xl font-bold">Liste des parcours en cours</h1>
                    <div className="flex h-10">
                        <Button
                          buttonMd
                          icon={Icon.Plus}
                          onClick={() => {
                                router.push(RouteNames.JOURNEY_CREATE)
                            }}
                          variant="primary"
                        >
                            Créer un parcours
                        </Button>
                    </div>
                </div>
                <JourneyCards />
            </div>
        </>
    )
}
