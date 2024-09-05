import React from 'react'
import { Button, Icon } from 'ui'

import { ConfigureCar } from './screens/configure-car/configure-car'
import { router, useRoute } from '../../utils/router'

/**
 * Screen to show all cars and configure them.
 */
export function Robot() {
  const route = useRoute(['robotconfigure'])

  switch (route?.name) {
    case 'robotconfigure': { return <ConfigureCar /> }
    default: {
      return (
        <>
          <div className="h-screen p-10">
            <div className="flex justify-between my-8">
              <h1 className="text-3xl font-bold">Liste des Yvees</h1>
              <div className="flex h-10">
                <Button
                  buttonMd
                  icon={Icon.Plus}
                  onClick={() => {
                    router.push('robotconfigure')
                  }}
                  variant="primary"
                >
                  Configurer un nouveau Yvees
                </Button>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}
