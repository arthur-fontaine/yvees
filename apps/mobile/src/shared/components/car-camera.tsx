import React from 'react'
import { WebView } from 'react-native-webview'

import { useCar } from '../hooks/use-car'

const IMG_PORT = 7000

/**
 * A component that displays the camera feed of the connected car.
 */
export function CarCamera() {
  const { carInfos } = useCar()

  if (carInfos?.ip === undefined) {
    return
  }

  return (
      <WebView
        javaScriptEnabled
        scalesPageToFit
        source={{
        html: /* html */`
          <img
            src="http://${carInfos.ip}:${IMG_PORT}"
            style="width: 100%; height: 100%;"
          />
        `,
      }}
        style={{ flex: 1, height: '100%', width: '100%' }}
      />
  )
}
