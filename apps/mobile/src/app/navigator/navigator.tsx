import { useAuth } from '@clerk/clerk-expo'
import type { NavigationContainerRef } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useRef } from 'react'

import { type PagesList, pages } from './pages'
import { useCar } from '../../shared/hooks/use-car'

// eslint-disable-next-line ts/naming-convention
const Pages = createNativeStackNavigator<PagesList>()

const HOME_PAGE = 'home' satisfies keyof PagesList

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
            initialRouteName={isSignedIn ? HOME_PAGE : 'authentication'}
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
  const { carId } = useCar()
  const navigationRef = useRef<NavigationContainerRef<PagesList>>(null)

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    if (!isSignedIn) {
      navigationRef.current?.navigate('authentication')
      return
    }

    if (carId !== undefined) {
      navigationRef.current?.navigate('sessionManual')
      return
    }

    navigationRef.current?.navigate(HOME_PAGE)
  }, [isLoaded, isSignedIn, carId])

  return { navigationRef }
}
