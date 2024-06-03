import { createRoute } from 'agrume'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, View } from 'react-native'
import { Button, Icon, ThemeProvider } from 'ui'

const hello = createRoute(async () => {
  return 'HELLO'
})

/**
 * Main application component.
 */
export function App() {
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <ThemeProvider theme="light">
        <Button
          icon={Icon.Heart}
          onClick={() => hello().then(console.log)}
          variant="primary"
        >
          Click me
        </Button>
      </ThemeProvider>
      <StatusBar style="auto" />
    </View>
  )
}
