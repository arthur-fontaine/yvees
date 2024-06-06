import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { type PagesList, pages } from './pages'

// eslint-disable-next-line ts/naming-convention
const Pages = createNativeStackNavigator<PagesList>()

/**
 * Navigator component.
 */
export function Navigator() {
  return (
    <NavigationContainer>
      <Pages.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}
      >
        {
          Object.entries(pages).map(([name, component]) => (
            <Pages.Screen
              component={component as never}
              key={name}
              name={name as never}
            />
          ))
        }
      </Pages.Navigator>
    </NavigationContainer>
  )
}
