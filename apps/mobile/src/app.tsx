import { useFonts } from 'expo-font'
import React from 'react'
import { View } from 'react-native'
import { getRnFonts } from 'ui'
import { Home } from './screens/Home/home'

export function App() {
  const [loaded] = useFonts(getRnFonts())
  if (!loaded) {
    return
  }

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
     <Home/>
    </View>
  )
}


