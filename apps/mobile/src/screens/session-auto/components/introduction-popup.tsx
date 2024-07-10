import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { Box, Card } from 'ui'

/**
 * The introduction popup component.
 */
export function IntroductionPopup() {
  const {
    cardDisplayed,
    closeCard,
    screenHeight,
    screenWidth,
  } = useCardController()

  return (
    cardDisplayed && (
      <Box
        alignItems="center"
        flex={1}
        height={screenHeight}
        justifyContent="center"
        paddingHorizontal="$normal"
        position="absolute"
        width={screenWidth}
      >
        <Card
          action={{
            onClick: closeCard,
            text: 'Commencer',
          }}
          text="Yvees est votre guide personnel pour cette visite ! Pilotez-le, trouvez les QR Codes situés en-dessous des oeuvres du musée, et scannez-les avec la caméra de votre Yvees. Des informations complémentaires apparaîtront sur votre téléphone."
          title="Pilotez votre Yvees"
          variant="default"
        />
      </Box>
    )
  )
}

function useCardController() {
  const [cardDisplayed, setDisplayCard] = useState(true)
  const { height: screenHeight, width: screenWidth } = useWindowDimensions()

  const closeCard = useCallback(() => {
    setDisplayCard(true)
  }, [])

  return {
    cardDisplayed,
    closeCard,
    screenHeight,
    screenWidth,
  }
}
