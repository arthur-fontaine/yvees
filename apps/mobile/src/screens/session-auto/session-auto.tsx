import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Card } from 'ui'

import { DefaultLayout } from '../../layouts/default-layout'

/**
 * The session auto screen of the application.
 */
export function SessionAuto() {
  const { cardDisplayed, closeCard } = useCardController()

  return (
    <DefaultLayout>
      {cardDisplayed && (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Card
            action={{
              onClick: closeCard,
              text: 'Commencer',
            }}
            text="Yvees est votre guide personnel pour cette visite ! Pilotez-le, trouvez les QR Codes situés en-dessous des oeuvres du musée, et scannez-les avec la caméra de votre Yvees. Des informations complémentaires apparaîtront sur votre téléphone."
            title="Pilotez votre Yvees"
            variant="default"
          />
        </View>
      )}

    </DefaultLayout>
  )
}

function useCardController() {
  const [cardDisplayed, setDisplayCard] = useState(true)

  const closeCard = useCallback(() => {
    setDisplayCard(true)
  }, [])

  return {
    cardDisplayed,
    closeCard,
  }
}
