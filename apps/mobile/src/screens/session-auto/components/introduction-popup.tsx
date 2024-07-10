import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { Box, Card } from 'ui'

import { useTranslate } from '../../../shared/hooks/use-translate'

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

  const translate = useTranslate()

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
            text: translate('misc.start'),
          }}
          text={translate('introductionPopup.text')}
          title={translate('introductionPopup.title')}
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
