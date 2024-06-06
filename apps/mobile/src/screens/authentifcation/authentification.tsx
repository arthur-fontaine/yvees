import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo'
// import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Separator, Title1 } from 'ui'

import { SignIn } from './components/sign-in'
import { SignInWithOAuth } from './components/sign-in-auth'
import { SignUp } from './components/sign-up'

const tokenCache = {
  getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    }
 catch (err) {
      return undefined
    }
  },
  saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    }
 catch (err) {
      return undefined
    }
  },
}

function SignOut() {
  const { isLoaded, signOut } = useAuth()
  if (!isLoaded) {
    return undefined
  }
  return (
    <View>
      <Button
        onClick={() => {
          signOut()
        }}
        variant="secondary"
      >
        Sign Out
      </Button>
    </View>
  )
}

/**
 *  Main authentication screen.
 */
export function Authentifcation() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <ClerkProvider
      publishableKey="pk_test_cHJvbXB0LWJlbmdhbC04Ni5jbGVyay5hY2NvdW50cy5kZXYk"
      tokenCache={tokenCache}
    >
      <SafeAreaView style={styles.container}>
        <SignedIn>
          {/* TODO Delete Text below when setup page signed in */}
          <View>
            <Text>You are Signed in</Text>
            <SignOut />
          </View>

        </SignedIn>
        {/* TODO Chore below when setup page signed out */}
        <SignedOut>
          <View style={styles.childrenCountainer}>

            {isSignUp ? <SignUp /> : <SignIn />}
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Separator />
              <View>
                <Text style={{ color: '#F4C898', textAlign: 'center', width: 50 }}>OU</Text>
              </View>
              <Separator />
            </View>
            <View style={styles.buttonsContainer}>
              <SignInWithOAuth />
              <Button
                onClick={() => setIsSignUp(!isSignUp)}
                variant="secondary"
              >
                {isSignUp ? 'Connectez-vous' : 'Inscrivez-vous'}
              </Button>
            </View>
          </View>
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    gap: 16,
  },
  childrenCountainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    justifyContent: 'space-between',
    marginTop: 32,
    paddingHorizontal: 32,
  },
  container: {
    backgroundColor: '#FFFBF5',
    borderColor: 'black',
    borderStartEndRadius: 28,
    borderStartStartRadius: 28,
    display: 'flex',
    height: '100%',
    marginTop: '50%',
    width: '100%',
  },
})
