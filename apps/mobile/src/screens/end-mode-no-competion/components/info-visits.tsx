import React from 'react'
import { Button, Text, View } from 'react-native'
import { Title1 } from 'ui'

// import { RouteNames, router } from '../../../../../dashboard/src/utils/router'
import { updateVisit } from '../../end-mode-no-competion/hooks/update-visit'
import { useVisitWithJourney } from '../hooks/use-visit-journey'

/**
 * Informations de la visite.
 */
export function InfoVisit() {
  const { loading, visits } = useVisitWithJourney()

  if (loading) {
    return <Text>Chargement...</Text>
  }

  const handleEndVisit = async () => {
    const visitId = visits?.[0]?.id

    if (visitId) {
      await updateVisit(visitId)
    }
    // router.push(RouteNames.ROBOT_HOME)
  }

  return (
      <View>
          <Title1 variant="default">Fin de la visite</Title1>
          <Text>{}</Text>
          <Text>
              Nombre d'étapes accomplies:
              {' '}
              {}
          </Text>
          <Button onPress={handleEndVisit} title="Retour à la page d'accueil" />
      </View>
  )
}
