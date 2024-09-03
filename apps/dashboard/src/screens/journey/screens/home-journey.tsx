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
// TODO:  Add router create step
// import { router } from '../../../utils/router'
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
        <h1 className="text-3xl font-bold my-8">
          Parcours :
          {' '}
          { journey.name }
        </h1>
        <div className="mb-8">
          <h2 className="text-xl mb-2">Description :</h2>
          <p className="text-sm text-muted-foreground max-w-3xl">
            { journey.description }
          </p>
        </div>
        <div className="flex justify-between my-4 items-center">
          <h2 className="text-xl">Liste des étapes :</h2>
          <div className="flex h-10">
            <Button
              buttonMd
              icon={Icon.Plus}
              onClick={() => {
                // router.push('')
              }}
              variant="primary"
            >
              Créer une étape
            </Button>
          </div>
        </div>
        {/* TODO: Delete fake data for real */}
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>QR Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Numéro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>New York</TableCell>
              <TableCell>800</TableCell>
              <TableCell>On Time</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Los Angeles</TableCell>
              <TableCell>4000</TableCell>
              <TableCell>Delayed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Chicago</TableCell>
              <TableCell>1200</TableCell>
              <TableCell>On Time</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
}
