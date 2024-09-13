import { ClerkProvider } from '@clerk/clerk-expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'
import { Sheet, ThemeProvider } from 'ui'

import { useInitialLoading } from './hooks/use-initial-loading'
import { Navigator } from './navigator/navigator'
import { tokenCache } from './utils/clerk-token-cache'
import { CarEventsProvider } from '../shared/hooks/use-car'
import { config } from '../shared/utils/config'

const queryClient = new QueryClient()

/**
 * Main application component.
 */
export function App() {
  const { loaded } = useInitialLoading()

  if (!loaded) {
    return
  }

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider theme="light">
        <Navigator />
        <Sheet open={true} title="MIAOU MIAOU" imageLink="https://chatfaitdubien.fr/wp-content/uploads/2022/03/quelles-petites-races-sont-plus.jpg">
          <View />
          <Text>
          CHAT TROP MINION
          </Text>
        </Sheet>
      </ThemeProvider>
      <StatusBar style="auto" />
    </View>
  )
}
