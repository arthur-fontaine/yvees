import { useClerk } from '@clerk/clerk-expo'
import React, { useRef } from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'ui'

import { Histories } from './components/histories'
import { JoinCard } from './components/join-card'
import { DefaultLayout } from '../../shared/layouts/default-layout'
/**
 * The home screen of the application.
 */
export function HomeScreen() {
  const { signOut } = useClerk()
  const onOpenCameraRef
    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    = useRef<
      Parameters<typeof JoinCard>[0]['onOpenCameraRef'] extends React.Ref<infer T>
        ? T
        : never
    >()

  return (
      <DefaultLayout>
          <View style={{ alignItems: 'flex-end', marginVertical: 10 }}>
              <Button icon={Icon.LogOut} onClick={() => signOut()} variant="primary"></Button>
          </View>
          <JoinCard onOpenCameraRef={onOpenCameraRef} />
          <Histories onOpenCameraRef={onOpenCameraRef} />
      </DefaultLayout>
  )
}
