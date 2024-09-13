import React from 'react';
import { Text, View, Button } from 'react-native';
import { Title1 } from 'ui';
import { RouteNames, router } from '../../../../../dashboard/src/utils/router'

import { useVisitWithJourney } from '../hooks/use-visit-journey';
import { updateVisit } from '../../end-mode-no-competion/hooks/update-visit'

export function InfoVisit() {
  const { loading, visits } = useVisitWithJourney()

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  const handleEndVisit = async () => {
    const visitId = visits?.[0]?.id; 
    
    if (visitId) {
      const endedAt = new Date().toISOString();
      await updateVisit(visitId, endedAt);
    }
    router.push(RouteNames.ROBOT_HOME);
  };

  return (
    <View>
      <Title1 variant="default">Fin de la visite</Title1>
      <Text>{}</Text>
      <Text>
        Nombre d'étapes accomplies: {}
      </Text>
      <Button title="Retour à la page d'accueil" onPress={handleEndVisit} />
    </View>
  );
}

