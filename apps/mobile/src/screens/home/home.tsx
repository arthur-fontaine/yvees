import type { BarcodeScanningResult } from 'expo-camera'
import { CameraView, useCameraPermissions } from 'expo-camera'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Card } from 'ui'

import { DefaultLayout } from '../../layouts/default-layout'

/**
 *
 */
export function HomeScreen() {
  const [cameraOpen, setCameraOpen] = useState(false)
  const [facing] = useState('back')
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    setScanned(true)
    console.log('ta mere elle me scan', scanningResult)
  }

  if (permission === null) {
    return <View />
  }

  if (cameraOpen && permission.granted) {
    return (
      <DefaultLayout>
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'],
          }}
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1 }}
        >
          <Button onClick={() => setScanned(false)} style={{ flex: 1 }} variant="primary">
            Scan again
          </Button>
        </CameraView>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <Card
        action={{
          onClick: () => {
            requestPermission().then((permission: any) => {
              if (permission) {
                setCameraOpen(true)
              }
            })
          },
          text: 'Scanner votre QR code',
        }}
        text="Vous vous apprêtez à visiter un musée ? Demandez à l’accueil si ils prennent en charge les Yvees afin de rendre votre visite plus attractive !"
        title="Rejoignez une session"
        variant="default"
      />
    </DefaultLayout>
  )
}
