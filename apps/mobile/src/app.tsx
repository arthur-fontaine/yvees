import { createRoute } from 'agrume'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { Button, Icon, ThemeProvider, Title1, getRnFonts } from 'ui'

const hello = createRoute(async () => {
  return 'HELLO'
})

/**
 * Main application component.
 */
export function App() {
  const [loaded] = useFonts(getRnFonts())
  if (!loaded) {
    return
  }

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <ThemeProvider theme="light">
        <Title1 variant="default">Hello, world!</Title1>
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
