import React from 'react'
import { useClerk } from '@clerk/clerk-expo';
import { Button, Card, Histories, Icon, ThemeProvider } from 'ui'
import { DefaultLayout } from '../../shared/layouts/default-layout';
import { View } from 'react-native';
import { useScanController } from './hooks/use-scan-controller'

/**
 * The home screen of the application.
 */
export function HomeScreen() {
  const { signOut } = useClerk();

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
    { action: { onClick: () => console.log('Clicked'), text: 'Action 1' }, date: 'Visité le 14 février 2024', place: 'Musée Grévin', title: 'Visite 1' },
    { action: { onClick: () => console.log('Clicked'), text: 'Action 1' }, date: 'Visité le 14 février 2024', place: 'Musée Grévin', title: 'Visite 1' },
    { action: { onClick: () => console.log('Clicked'), text: 'Action 1' }, date: 'Visité le 14 février 2024', place: 'Musée Grévin', title: 'Visite 1' },
    { action: { onClick: () => console.log('Clicked'), text: 'Action 1' }, date: 'Visité le 14 février 2024', place: 'Musée Grévin', title: 'Visite 1' },
    { action: { onClick: () => console.log('Clicked'), text: 'Action 1' }, date: 'Visité le 14 février 2024', place: 'Musée Grévin', title: 'Visite 1' },
    { action: { onClick: () => console.log('Clicked'), text: 'Action 1' }, date: 'Visité le 14 février 2024', place: 'Musée Grévin', title: 'Visite 1' },
    { action: { onClick: () => console.log('Clicked'), text: 'Action 1' }, date: 'Visité le 14 février 2024', place: 'Musée Grévin', title: 'Visite 1' },
  ]

  return (
    <DefaultLayout>
      <View style={{ alignItems: 'flex-end', marginVertical: 10 }}>
        <Button variant='primary' onClick={() => signOut()} >Log Out</Button>
      </View>

      <ThemeProvider>
        <Card
          action={{
            onClick: () => { },
            text: 'Scanner un QR Code',
          }}
          icon={Icon.QrCode}
          text="Vous vous apprêtez à visiter un musée ? Demandez à l’accueil si ils prennent en charge les Yvees afin de rendre votre visite plus attractive !"
          title="Rejoignez une session"
          variant="default"
        />
      </ThemeProvider>
      <Histories variant="default" histories={sampleHistories} />
    </DefaultLayout>
  )
}
