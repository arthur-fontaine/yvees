import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { Button, Icon } from 'ui'

import { SignIn } from './sign-in'
import { useWarmUpBrowser } from '../hook/use-warm-up-browser'

WebBrowser.maybeCompleteAuthSession()

/**
 *  Sign in with OAuth component.
 */
export function SignInWithOAuth() {
  useWarmUpBrowser()

  const googleOAuth = useOAuth({ strategy: 'oauth_google' })
  const appleOAuth = useOAuth({ strategy: 'oauth_apple' })

  const onPress = React.useCallback(async (strategy) => {
    const startOAuthFlow = strategy === 'oauth_google' ? googleOAuth.startOAuthFlow : appleOAuth.startOAuthFlow
    try {
      const { createdSessionId, setActive, signIn, signUp }
        = await startOAuthFlow()

      if (createdSessionId) {
        // console.log('OAuth session created', createdSessionId)
        setActive({ session: createdSessionId })
      }
 else {
        return (<SignIn />)
      }
    }
 catch (err) {
      console.error('OAuth error', err)
    }
  }, [googleOAuth, appleOAuth])

  return (
    <>
      <Button
        backgroundColor="#4285F4"
        icon={Icon.BrandGoogle}
        onClick={() => onPress('oauth_google')}
        variant="primary"
      >
        Sign in with Google
      </Button>
      <Button
        backgroundColor="#000000"
        icon={Icon.BrandApple}
        onClick={() => onPress('oauth_apple')}
        variant="primary"
      >
        Sign in with Apple
      </Button>
    </>
  )
}
