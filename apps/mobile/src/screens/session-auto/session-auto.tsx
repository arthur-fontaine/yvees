import React from 'react'
import { Text, View } from 'react-native'

import { IntroductionPopup } from './components/introduction-popup'
import { DefaultLayout } from '../../shared/layouts/default-layout'

/**
 * The session auto screen of the application.
 */
export function SessionAutoScreen() {
  return (
    <DefaultLayout>
      <View style={{ backgroundColor: 'red', flex: 1 }}>
        <Text>CAR CAMERA</Text>
      </View>
      <IntroductionPopup />
    </DefaultLayout>
  )
}
