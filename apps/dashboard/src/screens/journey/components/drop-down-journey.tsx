import React from 'react'
import { Button, Icon } from 'ui'

import { useDropDownJourney } from './hooks/use-drop-down-journey'
import type { JourneyService } from '../../../services/journey-service/journey-service'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../../shared/components/ui/dropdown-menu'
import { toast } from '../../../shared/components/ui/use-toast'
import { RouteNames, router } from '../../../utils/router'
import { deleteJourney, updateJourneyControlMode } from '../hooks/use-home-journey'
/**
 *   Journey Card component.
 */
export function JourneyDropDown({ journey }: { journey: JourneyService }) {
const {
  checkAutomatic,
  checkManual,
  setCheckAutomatic,
  setCheckManual,
} = useDropDownJourney(journey)

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
    }
 catch (error) {
      console.error('Failed to update journey control mode:', error)
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
                                checked={checkAutomatic}
                                onCheckedChange={(checked) => {
                    setCheckAutomatic(checked)
                    setCheckManual(!checked)
                    updateJourneyMode(checked ? 'automatic' : 'manual')
                  }}
                              >
                                  <span>Automatique</span>
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                checked={checkManual}
                                onCheckedChange={(checked) => {
                    setCheckManual(checked)
                    setCheckAutomatic(!checked)
                    updateJourneyMode(checked ? 'manual' : 'automatic')
                  }}
                              >
                                  <span>Manuel</span>
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuSeparator />
                          </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem
                    onClick={() => handleDeleteJourney(Number(journey.id))}
                    style={{ color: '#FF0000' }}
                  >
                      <span>Supprimer la visite</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
          </DropdownMenuContent>
      </DropdownMenu>
  )
}
