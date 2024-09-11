import React from "react";
import { Button, Card, Icon, ThemeProvider } from "ui";
import { useScanController } from "./hooks/use-scan-controller";
import { DefaultLayout } from "../../shared/layouts/default-layout";
import { useVisitData } from "./hooks/use-visit-data";
import { Text } from 'react-native'
import { CameraView } from 'expo-camera'
import { Histories } from "./components/histories";

/**
 * The home screen of the application.
 */
export function HomeScreen() {
  const { visit, loading } = useVisitData();

  const {
    allowToScanAgain,
    handleBarCodeScanned,
    hasPermissionToUseCamera,
    isCameraOpen,
    openCamera,
    requestPermissionToUseCamera,
  } = useScanController();


  if (isCameraOpen && hasPermissionToUseCamera) {
    return (
      <DefaultLayout>
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          facing="back"
          onBarcodeScanned={handleBarCodeScanned}
          style={{ flex: 1 }}
        >
          <Button onClick={allowToScanAgain} variant="primary">
            Annuler
          </Button>
        </CameraView>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <ThemeProvider>
        <Card
          action={{
            onClick: () => { },
            text: "Scanner un QR Code",
          }}
          icon={Icon.QrCode}
          text="Vous vous apprêtez à visiter un musée ? Demandez à l’accueil si ils prennent en charge les Yvees afin de rendre votre visite plus attractive !"
          title="Rejoignez une session"
          variant="default"
        />
      </ThemeProvider>

      {visit && visit.length > 0 && (
        <Histories variant="default" histories={visit} />
      )}

      {!loading && visit && visit.length === 0 && (
        <Text>Vous n'avez aucune visite pour le moment.</Text>
      )}

    </DefaultLayout>
  );
}
