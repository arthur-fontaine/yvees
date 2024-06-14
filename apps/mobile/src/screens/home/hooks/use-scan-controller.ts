import type { BarcodeScanningResult } from 'expo-camera'
import { useCameraPermissions } from 'expo-camera'
import { useCallback, useRef, useState } from 'react'

/**
 * A hook to control the scan screen.
 */
export function useScanController() {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [, requestPermissionToUseCamera]
    = useCameraPermissions()

  const scanned = useRef(false)

  const handleBarCodeScanned = useCallback(
    (scanningResult: BarcodeScanningResult) => {
      if (scanned.current) {
        return
      }
      scanned.current = true

      // eslint-disable-next-line no-console
      console.log('ta mere elle me scan', scanningResult) // Do something with the scanning result other than logging it
    },
    [],
  )

  const openCamera = useCallback(() => {
    requestPermissionToUseCamera().then((permission) => {
      if (permission.granted) {
        setIsCameraOpen(true)
      }
    })
  }, [requestPermissionToUseCamera])

  const closeCamera = useCallback(() => {
    scanned.current = false
    setIsCameraOpen(false)
  }, [])

  return {
    closeCamera,
    handleBarCodeScanned,
    isCameraOpen,
    openCamera,
  }
}
