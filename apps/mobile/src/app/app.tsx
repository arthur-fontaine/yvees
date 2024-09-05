import { ClerkProvider } from '@clerk/clerk-expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'ui'

import { useInitialLoading } from './hooks/use-initial-loading'
import { Navigator } from './navigator/navigator'
import { tokenCache } from './utils/clerk-token-cache'
import { CarEventsProvider } from '../shared/hooks/use-car'
import { config } from '../shared/utils/config'

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
        <GestureHandlerRootView>
          <ClerkProvider
            publishableKey={config.clerk.publishableKey}
            tokenCache={tokenCache}
          >
            <CarEventsProvider>
              <Navigator />
            </CarEventsProvider>
          </ClerkProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
      <StatusBar style="auto" />
    </View>
  )
}
