import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { ThemeProvider } from 'ui'

import { useInitialLoading } from './hooks/use-initial-loading'
import { Navigator } from './navigator/navigator'

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
      </ThemeProvider>
      <StatusBar style="auto" />
    </View>
  )
}
