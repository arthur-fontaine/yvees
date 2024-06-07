import type { BarcodeScanningResult } from 'expo-camera'
import { useCameraPermissions } from 'expo-camera'
import { useCallback, useRef, useState } from 'react'

/**
 * A hook to control the scan screen.
 */
export function useScanController() {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [hasPermissionToUseCamera, requestPermissionToUseCamera]
    = useCameraPermissions()

  const scanned = useRef(false)

  const handleBarCodeScanned = useCallback(
    (scanningResult: BarcodeScanningResult) => {
      if (scanned.current) {
        return
      }
      scanned.current = true
      console.log('ta mere elle me scan', scanningResult)
    },
    [],
  )

  const openCamera = useCallback(() => {
    setIsCameraOpen(true)
  }, [])

  const allowToScanAgain = useCallback(() => {
    scanned.current = false
  }, [])

  return {
    allowToScanAgain,
    handleBarCodeScanned,
    hasPermissionToUseCamera: hasPermissionToUseCamera?.granted ?? false,
    isCameraOpen,
    openCamera,
    requestPermissionToUseCamera,
  }
}
