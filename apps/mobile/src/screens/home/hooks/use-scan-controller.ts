import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import type { BarcodeScanningResult } from 'expo-camera'
import { useCameraPermissions } from 'expo-camera'
import { useCallback, useRef, useState } from 'react'

import { carIdSchema } from '../../../schemas/car-id'
import { joinSessionService } from '../../../services/join-session-service/join-session-service'
import { useCarEvents } from '../../../shared/hooks/use-car-events'
import { serverImpls } from '../../../utils/server-impls'

const joinSession = createRoute(DI.provide(function* (carId: string) {
  const { joinSession } = yield * DI.requireService(joinSessionService)
  return joinSession(carId)
}, serverImpls))

/**
 * A hook to control the scan screen.
 */
export function useScanController() {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [, requestPermissionToUseCamera]
    = useCameraPermissions()

  const scanned = useRef(false)

  const { registerCarEventsIterator } = useCarEvents()

  const handleBarCodeScanned = useCallback(
    async (scanningResult: BarcodeScanningResult) => {
      if (scanned.current) {
        return
      }

      const r = carIdSchema.try(scanningResult.data)
      if (!r.ok) {
        return
      }

      scanned.current = true
      const carEventsIterator = await joinSession(r.value)

      registerCarEventsIterator(carEventsIterator)
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
