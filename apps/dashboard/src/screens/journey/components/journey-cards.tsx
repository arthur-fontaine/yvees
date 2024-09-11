import React from 'react'
import { Icon } from 'ui'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../shared/components/ui/card'
import { RouteNames, router } from '../../../utils/router'
import { useJourneysData } from '../hooks/use-journeys-data'

/**
 *   Journey Card component.
 */
export function JourneyCards() {
  const { journeys, loading } = useJourneysData()
  if (loading) {
    return <p>Loading...</p>
  }

  if (journeys === undefined || journeys.length === 0) {
    return <p>No journeys available.</p>
  }
  return (
      <div className="grid grid-cols-4 gap-4">
          {journeys.length > 0
          && journeys.map(data => (
              <Card
                className="hover:bg-orangeLight"
                key={data.id}
                onClick={() => {
                  router.push(RouteNames.JOURNEY_HOME, {
                    journeyId: data.id.toString(),
                  })
                }}
              >
                  <CardHeader>
                      <CardTitle className="flex justify-between text-1xl mb-4">
                          {data.name}
                          <Icon.Waypoints color="$orange" size={24} />
                      </CardTitle>
                      <CardDescription className="text-black min-h-10 line-clamp-2">
                          {data.description}
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="flex justify-between text-sm text-muted-foreground">
                          <p>Temps moyen :</p>
                          <p>
                              {data.averageVisitDuration
                    ? data.averageVisitDuration
                    : 'N/A'}
                          </p>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                          <p>Nombres d'étapes :</p>
                          <p>{data.numberOfSteps}</p>
                      </div>
                  </CardContent>
              </Card>
        ))}
      </div>
  )
}
