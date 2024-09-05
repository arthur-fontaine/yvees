import React from 'react'
import { Icon } from 'ui'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card'
import { router } from '../../../utils/router'
import { useDataCard } from '../hooks/use-data-card'
import type { JourneySerialized } from '../types/data-card'

 /**
  *   Journey Card component.
  */
 export function JourneyCard() {
  const { journey, loading } = useDataCard()
  if (loading) {
    return <p>Loading...</p>
  }

  if (journey === undefined || journey.length === 0) {
    return <p>No journeys available.</p> // Show a message if there are no journeys
  }
  return (
      <div className="grid grid-cols-4 gap-4">
          {journey.length > 0 && journey.map((data: JourneySerialized) => (
              <Card className="hover:bg-orangeLight" key={data.id} onClick={() => { router.push('journeyhome', { journeyId: data.id.toString() }) }}>
                  <CardHeader>
                      <CardTitle className="flex justify-between text-1xl mb-4">
                          {data.name}
                          <Icon.Waypoints color="$orange" size={24} />
                      </CardTitle>
                      <CardDescription className="text-black min-h-10 line-clamp-2">{data.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="flex justify-between text-sm text-muted-foreground">
                          <p>Temps moyen :</p>
                          <p>{data.averageVisitDuration ? data.averageVisitDuration : 'N/A'}</p>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                          <p>Nombres d'étapes :</p>
                          <p>{data.journeySteps.length}</p>
                      </div>
                  </CardContent>
              </Card>
        ))}
      </div>
  )
}
