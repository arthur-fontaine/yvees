import { getToken } from '@tamagui/core'
import React from 'react'
import { WebView } from 'react-native-webview'

import { useCar } from '../hooks/use-car'

const IMG_PORT = 7000

/**
 * A component that displays the camera feed of the connected car.
 */
export function CarCamera() {
  const { carInfos } = useCar()
  const radius = getToken('$radius.card')

  if (carInfos?.ip === undefined) {
    return
  }

  return (
      <WebView
        bounces={false}
        javaScriptEnabled
        originWhitelist={['*']}
        scalesPageToFit
        source={{
        html: /* html */`
          <img
            src="http://${carInfos.ip}:${IMG_PORT}"
            style="width: 100%; height: auto; display: block; object-fit: contain; border-radius: ${radius}px; margin: auto; position: absolute; top: 0; left: 0; right: 0; bottom: 0;"
            width="100%"
          />
        `,
      }}
        style={{
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
      }}
      />
  )
}
