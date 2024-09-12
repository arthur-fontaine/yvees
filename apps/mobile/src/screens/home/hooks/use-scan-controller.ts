import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import type { BarcodeScanningResult } from 'expo-camera'
import { useCameraPermissions } from 'expo-camera'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useCar } from '../../../shared/hooks/use-car'
import type { JourneyId } from '../../../shared/schemas/journey-id'
import { journeyIdSchema } from '../../../shared/schemas/journey-id'
import { joinSessionService } from '../../../shared/services/join-session-service/join-session-service'
import { agrumeSseClientForRn } from '../../../shared/utils/agrume-sse-client-for-rn'
import { serverImpls } from '../../../shared/utils/server-impls'

const joinSessionFn
  = DI.provide(function* ({ journeyId }: { journeyId: JourneyId }) {
    const { joinSession } = yield * DI.requireService(joinSessionService)
    return joinSession({ journeyId })
  }, serverImpls)
const joinSession = createRoute(joinSessionFn, {
  getClient: agrumeSseClientForRn<typeof joinSessionFn>,
})

interface UseScanControllerProps {
  onOpenCameraRef: React.MutableRefObject<
    ((cameraIsOpen: boolean) => void) | undefined
  >
}

/**
 * A hook to control the scan screen.
 */
export function useScanController(props: UseScanControllerProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [, requestPermissionToUseCamera]
    = useCameraPermissions()

  const scanned = useRef(false)

  const { registerCar } = useCar()

  const handleBarCodeScanned = useCallback(
    async (scanningResult: BarcodeScanningResult) => {
      if (scanned.current) {
        return
      }

      const r = journeyIdSchema.try(scanningResult.data)
      if (!r.ok) {
        return
      }

      scanned.current = true
      const carEventsIterator = await joinSession({
        journeyId: r.value,
      })

      registerCar({
        carEventsIterator,
        journeyId: r.value,
      })
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

  useEffect(() => {
    props.onOpenCameraRef?.current?.(isCameraOpen)
  }, [isCameraOpen])

  return {
    closeCamera,
    handleBarCodeScanned,
    isCameraOpen,
    openCamera,
  }
}
