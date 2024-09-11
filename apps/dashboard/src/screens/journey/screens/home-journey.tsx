import React from 'react'
import { Button, Icon, useTheme } from 'ui'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../shared/components/ui/table'
import { toast } from '../../../shared/components/ui/use-toast'
import { RouteNames, router } from '../../../utils/router'
import { deleteJourney, deleteJourneyStep, useJourneyData } from '../hooks/use-home-journey'

/**
 * Journey Home screen.
 */
export function JourneyHome({ journeyId }: { journeyId: string }) {
  const { journey, loading, refetch } = useJourneyData(journeyId)
  const { orange } = useTheme()

  if (loading) {
    return <p>Loading...</p>
  }
  if (journey === undefined) {
    return <p>No journey available.</p>
  }

  const handleDeleteStep = async (journeyStepId: number) => {
    try {
      await deleteJourneyStep(journeyStepId)
      refetch()
    }
    catch (error) {
      console.error('Failed to delete step:', error)
    }
  }

  const handleDeleteJourney = async (journeyId: number) => {
    try {
      await deleteJourney(journeyId)
      toast({
        description: 'Le parcours a été supprimé avec succès !',
        duration: 3500,
        title: 'Succès',
      })
      router.push(RouteNames.JOURNEY_LIST)
    }
    catch (error) {
      toast({
        description: 'Échec de la suppression du parcours.',
        duration: 3500,
        title: 'Erreur',
      })
    }
  }

  const sortedSteps = [...journey.journeySteps].sort((a, b) => {
    if (a.start) {
      return -1
    }
    if (b.start) {
      return 1
    }
    if (a.end) {
      return 1
    }
    if (b.end) {
      return -1
    }
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() // Sort the rest by creation date
  })
  return (
      <div className="h-screen p-10">
          <div className="flex justify-between my-4 items-center">
              <h1 className="text-3xl font-bold my-8">
                  Parcours :
                  {journey.name}
              </h1>
              <h3>
                  {new Date(journey.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
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
              <div className="flex h-10 gap-4">
                  <Button
                    buttonMd
                    icon={Icon.Plus}
                    onClick={() => {
              router.push(RouteNames.JOURNEY_CREATE_STEP, { journeyId })
            }}
                    variant="primary"
                  >
                      Créer une étape
                  </Button>
                  <Button
                    icon={Icon.Trash}
                    onClick={() => handleDeleteJourney(Number(journeyId))}
                    variant="cancel"
                  >
                      Delete
                  </Button>
              </div>
          </div>
          <Table className="border">
              <TableHeader>
                  <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>QR Code</TableHead>
                      <TableHead>Date de création</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {sortedSteps.length > 0 ? (
            sortedSteps.map(step => (
                <TableRow key={step.id}>
                    <TableCell>{step.name}</TableCell>
                    <TableCell>
                        <a download={`QRCode-${journey.name}-${step.name}.png`} href={step.qrCodeBase64}>
                            <p style={{ color: orange.val, textDecoration: 'underline' }}>
                                Télécharger le QR Code
                            </p>
                        </a>
                    </TableCell>
                    <TableCell>
                        {new Date(step.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                    </TableCell>
                    <TableCell className="float-right">
                        <Button
                          disabled={step.end || step.start}
                          icon={Icon.Trash}
                          onClick={() => handleDeleteStep(step.id)}
                          variant="cancel"
                        >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            ))
          ) : (
              <TableRow>
                  <TableCell colSpan={3}>
                      Erreur lors du chargement. Contacter le support
                  </TableCell>
              </TableRow>
          )}
              </TableBody>
          </Table>
      </div>
  )
}
