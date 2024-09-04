import React from 'react'
import { Button, Icon } from 'ui'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../shared/components/ui/table'
import { router } from '../../../utils/router'
import { useJourneyData } from '../hooks/use-home-journey'

/**
 * Journey Home screen.
 */
export function JourneyHome({ journeyId }: { journeyId: string }) {
  const { journey, loading } = useJourneyData(journeyId)
  if (loading) {
    return <p>Loading...</p>
  }
  if (journey === undefined) {
    return <p>No journey available.</p>
  }
  return (
      <div className="h-screen p-10">
          <div className="flex justify-between my-4 items-center">
              <h1 className="text-3xl font-bold my-8">
                  Parcours :
                  {journey.name}
              </h1>
              <h3>
                  {new Date(journey.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric',
      })}
              </h3>
          </div>
          <div className="mb-8">
              <h2 className="text-xl mb-2">Description :</h2>
              <p className="text-sm text-muted-foreground max-w-3xl">
                  {journey.description}
              </p>
          </div>
          <div className="flex justify-between my-4 items-center">
              <h2 className="text-xl">Liste des étapes :</h2>
              <div className="flex h-10">
                  <Button
                    buttonMd
                    icon={Icon.Plus}
                    onClick={() => {
              router.push('journeycreateJourneyStep', { journeyId })
            }}
                    variant="primary"
                  >
                      Créer une étape
                  </Button>
              </div>
          </div>
          <Table className="border">
              <TableHeader>
                  <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>QR Code</TableHead>
                      <TableHead>Date de création</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {journey.journeySteps.map(step => (
                      <TableRow key={step.id}>
                          <TableCell>{step.name}</TableCell>
                          <TableCell>{step.id}</TableCell>
                          <TableCell>
                              {new Date(step.createdAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
                          </TableCell>
                      </TableRow>
          ))}
              </TableBody>
          </Table>
      </div>
  )
}
