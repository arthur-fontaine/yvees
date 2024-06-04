import { createRoute } from 'agrume'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { ThemeProvider, Card } from 'ui'

const hello = createRoute(async () => {
  return 'HELLO'
})

export function Home() {
  return (
    <View style={{ alignItems: 'center', flex: 2, justifyContent: 'center' }}>
      <ThemeProvider theme="light">

        <Card variant='default' 
        title={'Rejoignez une session'} 
        text={'Vous vous apprêtez à visiter un musée ? Demandez à l’accueil si ils prennent en charge les Yvees afin de rendre votre visite plus attractive !'} 
        action={{text : "Scanner votre QR code", onClick: ()=> hello().then(console.log)}}
         />

      </ThemeProvider>
      <StatusBar style="auto" />
    </View>
  )
}
