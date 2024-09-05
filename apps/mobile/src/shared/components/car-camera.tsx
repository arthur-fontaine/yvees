import { WebView } from "react-native-webview"
import { useCar } from "../hooks/use-car"
import React from "react"

const IMG_PORT = 7000

export const CarCamera = () => {
  const { carInfos } = useCar()

  if (carInfos?.ip === undefined) {
    return
  }

  return (
    <WebView
      scalesPageToFit
      javaScriptEnabled
      style={{ flex: 1, width: '100%', height: '100%' }}
      source={{
        html: /* html */`
          <img
            src="http://${carInfos.ip}:${IMG_PORT}"
            style="width: 100%; height: 100%;"
          />
        `,
      }}
    />
  )
}
