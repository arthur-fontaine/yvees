import { CameraView } from 'expo-camera'
import React from 'react'
import { Button, Card, Icon, ThemeProvider, Histories } from 'ui'

import { useScanController } from './hooks/use-scan-controller'
import { DefaultLayout } from '../../layouts/default-layout'

/**
 * The home screen of the application.
 */
export function HomeScreen() {
  const {
    allowToScanAgain,
    handleBarCodeScanned,
    hasPermissionToUseCamera,
    isCameraOpen,
    openCamera,
    requestPermissionToUseCamera,
  } = useScanController()

  if (isCameraOpen && hasPermissionToUseCamera) {
    return (
      <DefaultLayout>
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'],
          }}
          facing="back"
          onBarcodeScanned={handleBarCodeScanned}
          style={{ flex: 1 }}
        >
          <Button
            onClick={allowToScanAgain}
            variant="primary"
          >
            Annuler
          </Button>
        </CameraView>
      </DefaultLayout>
    )
  }

  const sampleHistories = [
    { title: 'Visite 1', place: 'Paris', date: '2023-06-01', action: { onClick: () => console.log('Clicked'), text: 'Action 1' } },
    { title: 'Visite 1', place: 'Paris', date: '2023-06-01', action: { onClick: () => console.log('Clicked'), text: 'Action 1' } },
    { title: 'Visite 1', place: 'Paris', date: '2023-06-01', action: { onClick: () => console.log('Clicked'), text: 'Action 1' } },
  ];
    
  return (
    <DefaultLayout>
      <ThemeProvider>

        <Card
          action={{
            onClick: () => {},
            text: 'Scanner un QR Code',
          }}
          icon={Icon.QrCode}
          text="Vous vous apprêtez à visiter un musée ? Demandez à l’accueil si ils prennent en charge les Yvees afin de rendre votre visite plus attractive !"
          title="Rejoignez une session"
          variant="default"
        />
      </ThemeProvider>
      <Histories histories={sampleHistories}/>
    </DefaultLayout>
  )
}
