import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, View } from 'react-native'
import { Button, ThemeProvider } from 'ui'

/**
 * Main application component.
 */
export function App() {
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <ThemeProvider theme="light">
        <Button
          icon={<Text>🚀</Text>}
          onPress={() => console.log('Button clicked')}
        >
          Click me
        </Button>
      </ThemeProvider>
      <StatusBar style="auto" />
    </View>
  )
}
