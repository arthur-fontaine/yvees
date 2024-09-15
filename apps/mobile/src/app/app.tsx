import { ClerkProvider } from '@clerk/clerk-expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Sheet, ThemeProvider } from 'ui'

import { useInitialLoading } from './hooks/use-initial-loading'
import { Navigator } from './navigator/navigator'
import { tokenCache } from './utils/clerk-token-cache'
import { CarEventsProvider } from '../shared/hooks/use-car'
import { config } from '../shared/utils/config'


const queryClient = new QueryClient()

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
          <QueryClientProvider client={queryClient}>
              <ThemeProvider theme="light">
                  <GestureHandlerRootView>
                      <ClerkProvider
                        publishableKey={config.clerk.publishableKey}
                        tokenCache={tokenCache}
                      >
                          <CarEventsProvider>
                              <Navigator />
                              <Sheet imageLink="https://chatfaitdubien.fr/wp-content/uploads/2022/03/quelles-petites-races-sont-plus.jpg" open={true} title="MIAOU MIAOU">
                                  <Text>
                                      CHAT TROP MINION
                                  </Text>
                              </Sheet>
                          </CarEventsProvider>
                      </ClerkProvider>
                  </GestureHandlerRootView>
              </ThemeProvider>
              <StatusBar style="auto" />
          </QueryClientProvider>
      </View>
  )
}
