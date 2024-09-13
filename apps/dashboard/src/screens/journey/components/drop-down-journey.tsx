import React from 'react'
import { Button, Icon } from 'ui'

import { useJourneyModeSelector } from './hooks/use-journey-mode-selector'
import { useJournalYveesSelector } from './hooks/use-journey-yvees-selector'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../../shared/components/ui/dropdown-menu'
import { toast } from '../../../shared/components/ui/use-toast'
import { RouteNames, router } from '../../../utils/router'
import type { useJourneyData } from '../hooks/use-home-journey'
import { deleteJourney, updateJourneyControlMode } from '../hooks/use-home-journey'

/**
 *   Journey Card component.
 */
export function JourneyDropDown(
  { journey }: { journey: NonNullable<ReturnType<typeof useJourneyData>['journey']> },
) {
  const {
    mode,
    setMode,
  } = useJourneyModeSelector(journey)

  const {
    assignYveesToJourney,
    availableYvees,
    carAssignedToJourney,
  } = useJournalYveesSelector(journey)

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

  const updateJourneyMode = async (newMode: 'automatic' | 'manual') => {
    try {
      await updateJourneyControlMode({
        controlMode: newMode,
        journeyId: journey.id,
      })
      toast({
        description: `Le mode de visite a été changé en ${newMode === 'automatic' ? 'automatique' : 'manuel'} avec succès.`,
        duration: 3500,
        title: `Mode de visite ${newMode === 'automatic' ? 'automatique' : 'manuel'}`,
      })
    }
    catch (error) {
      toast({
        description: 'Échec du changement de mode de visite.',
        duration: 3500,
        title: 'Erreur',
      })
    }
  }

  return (
      <DropdownMenu>
          <DropdownMenuTrigger>
              <Button buttonMd icon={Icon.MoreHorizontal} variant="empty" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Changement Parcours</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>

                  <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                          <span>Mode de visite</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                              <DropdownMenuCheckboxItem
                                checked={mode === 'automatic'}
                                onCheckedChange={(checked: boolean) => {
                                  setMode('automatic')
                                  updateJourneyMode(checked ? 'automatic' : 'manual')
                                }}
                              >
                                  <span>Automatique</span>
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                checked={mode === 'manual'}
                                onCheckedChange={(checked: boolean) => {
                                  setMode('manual')
                                  updateJourneyMode(checked ? 'manual' : 'automatic')
                                }}
                              >
                                  <span>Manuel</span>
                              </DropdownMenuCheckboxItem>
                          </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                          <span>Yvees lié</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                              {carAssignedToJourney && (
                                  <DropdownMenuCheckboxItem
                                    checked
                                  >
                                      <span>{carAssignedToJourney.name}</span>
                                  </DropdownMenuCheckboxItem>
                              )}
                              {availableYvees
                                .filter(yvees =>
                                  yvees.id !== carAssignedToJourney?.id,
                                )
                                .map(yvees => (
                                    <DropdownMenuCheckboxItem
                                      checked={
                                        carAssignedToJourney?.id === yvees.id
                                      }
                                      key={yvees.id}
                                      onCheckedChange={() => {
                                        if (
                                          carAssignedToJourney?.id !== yvees.id
                                        ) {
                                          assignYveesToJourney(yvees.id)
                                        }
                                      }}
                                    >
                                        <span>{yvees.name}</span>
                                    </DropdownMenuCheckboxItem>
                                ))}
                          </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <DropdownMenuItem
                    onClick={() => handleDeleteJourney(Number(journey.id))}
                    style={{ color: '#FF0000' }}
                  >
                      <span>Supprimer la visite</span>
                  </DropdownMenuItem>

              </DropdownMenuGroup>
          </DropdownMenuContent>
      </DropdownMenu>
  )
  }
