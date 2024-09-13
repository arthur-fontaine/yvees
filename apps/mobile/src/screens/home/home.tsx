import { CameraView } from 'expo-camera'
import React from 'react'
import { Button, Card, Icon, ThemeProvider } from 'ui'

import { Histories } from './components/histories'
import { JoinCard } from './components/join-card'
import { DefaultLayout } from '../../shared/layouts/default-layout'

/**
 * The home screen of the application.
 */
export function HomeScreen() {
  const onOpenCameraRef
    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    = useRef<
      Parameters<typeof JoinCard>[0]['onOpenCameraRef'] extends React.Ref<infer T>
        ? T
        : never
    >()

  return (
      <DefaultLayout>
          <JoinCard onOpenCameraRef={onOpenCameraRef} />
          <Histories onOpenCameraRef={onOpenCameraRef} />
      </DefaultLayout>
  )
}
