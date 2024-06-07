import { CameraView } from 'expo-camera'
import React from 'react'
import { Button, Card } from 'ui'

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

  return (
    <DefaultLayout>
      <Card
        action={{
          onClick: () => {},
          text: 'Commencer',
        }}
        text="Yvees est votre guide personnel pour cette visite ! Pilotez-le, trouvez les QR Codes situez en-dessous des oeuvres du musée, et scannez les avec la caméra de votre Yvees. Des informations complémentaires apparaîtront sur votre téléphone."
        title="Pilotez votre Yvees"
        variant="default"
      />
    </DefaultLayout>
  )
}
