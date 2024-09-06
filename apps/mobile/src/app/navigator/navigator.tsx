import { useAuth } from '@clerk/clerk-expo'
import type { NavigationContainerRef } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useRef } from 'react'

import { type PagesList, pages } from './pages'

// eslint-disable-next-line ts/naming-convention
const Pages = createNativeStackNavigator<PagesList>()

/**
 * Navigator component.
 */
export function Navigator() {
  const { isLoaded, isSignedIn } = useAuth()
  const { navigationRef } = useNavigationAuthEffect()

  if (!isLoaded) {
    return
  }

  return (
      <NavigationContainer ref={navigationRef}>
          <Pages.Navigator
            initialRouteName={isSignedIn ? 'home' : 'authentication'}
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

function useNavigationAuthEffect() {
  const { isLoaded, isSignedIn } = useAuth()
  const navigationRef = useRef<NavigationContainerRef<PagesList>>(null)

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    if (isSignedIn) {
      navigationRef.current?.navigate('sessionManual')
    }
    else {
      navigationRef.current?.navigate('sessionManual')
    }
  }, [isLoaded, isSignedIn])

  return { navigationRef }
}
