import { CameraView } from 'expo-camera'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect, useRef } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { Animated, Easing, useAnimatedValue, useWindowDimensions } from 'react-native'
import { getToken, useTheme } from 'tamagui'
import { Box, Button, Card, Icon } from 'ui'

import { useTranslate } from '../../../shared/hooks/use-translate'
import { useScanController } from '../hooks/use-scan-controller'

interface JoinCardProps {
  onOpenCameraRef: Parameters<typeof useScanController>[0]['onOpenCameraRef']
}

/**
 * A card to join a session.
 */
export function JoinCard(props: JoinCardProps) {
  const {
    closeCamera,
    handleBarCodeScanned,
    isCameraOpen,
    openCamera,
  } = useScanController({
    onOpenCameraRef: props.onOpenCameraRef,
  })

  const {
    cameraCardHeight,
    cameraCardOpacity,
    handleJoinCardLayout,
    joinCardOpacity,
  } = useCardsAnimation({
    isCameraOpen,
  })

  const translate = useTranslate()

  const cardBackgroundColor = useTheme().cardBackgroundColor?.val

  return (
      <Box>
          <Animated.View
            onLayout={handleJoinCardLayout}
            style={{
          opacity: joinCardOpacity,
        }}
          >
              <Card
                action={{
            onClick: openCamera,
            text: translate('joinCard.scanQRCode'),
          }}
                icon={Icon.QrCode}
                text={translate('joinCard.welcomeText')}
                title={translate('joinCard.title')}
                variant="default"
              />
          </Animated.View>
          <Animated.View
            style={{
          left: 0,
          opacity: cameraCardOpacity,
          pointerEvents: isCameraOpen ? 'auto' : 'none',
          position: 'absolute',
          right: 0,
        }}
          >
              <Animated.View
                style={{
            height: cameraCardHeight,
          }}
              >
                  <Box borderRadius="$card" flex={1} overflow="hidden">
                      <CameraView
                        barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
                        facing="back"
                        onBarcodeScanned={handleBarCodeScanned}
                        style={{ flex: 1 }}
                      />
                      <LinearGradient
                        colors={[`${cardBackgroundColor}00`, `${cardBackgroundColor}FF`]}
                        end={{ x: 0, y: 1 }}
                        locations={[0, 0.68]}
                        start={{ x: 0, y: 0 }}
                        style={{
                bottom: 0,
                height: 260,
                left: 0,
                position: 'absolute',
                right: 0,
              }}
                      />
                      <Box bottom={0} left={0} margin="$card" position="absolute" right={0}>
                          <Button
                            onClick={closeCamera}
                            variant="primary"
                          >
                              {translate('misc.close')}
                          </Button>
                      </Box>
                  </Box>
              </Animated.View>
          </Animated.View>
      </Box>
  )
}

function useCardsAnimation({ isCameraOpen }: { isCameraOpen: boolean }) {
  const animatedOpacity = useAnimatedValue(0)

  const maxHeight = useWindowDimensions().height - (getToken('$space.normal') * 2) - (16 + getToken('$space.normal') * 2)
  const defaultHeight = useRef(0)
  const animatedHeight = useAnimatedValue(0, { useNativeDriver: false })

  const handleJoinCardLayout = useCallback((event: LayoutChangeEvent) => {
    defaultHeight.current = event.nativeEvent.layout.height
    animatedHeight.setValue(defaultHeight.current)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line ts/naming-convention
    const ANIMATION_EASING = Easing.circle
    const ANIMATION_DURATION = 500

    Animated
      .timing(animatedOpacity, {
        delay: isCameraOpen ? 0 : ANIMATION_DURATION,
        duration: ANIMATION_DURATION,
        easing: ANIMATION_EASING,
        toValue: isCameraOpen ? 1 : 0,
        useNativeDriver: true,
      })
      .start()

    Animated
      .timing(animatedHeight, {
        delay: isCameraOpen ? ANIMATION_DURATION : 0,
        duration: ANIMATION_DURATION,
        easing: ANIMATION_EASING,
        toValue: isCameraOpen ? maxHeight : defaultHeight.current,
        useNativeDriver: false,
      })
      .start()
  }, [isCameraOpen])

  return {
    cameraCardHeight: animatedHeight,
    cameraCardOpacity: animatedOpacity,
    handleJoinCardLayout,
    joinCardOpacity: animatedOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  }
}
