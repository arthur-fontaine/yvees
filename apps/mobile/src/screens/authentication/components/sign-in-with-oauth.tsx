import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback } from 'react'
import { Button, Icon } from 'ui'

import { useTranslate } from '../../../shared/hooks/use-translate'
import { useWarmUpBrowser } from '../hooks/use-warm-up-browser'

WebBrowser.maybeCompleteAuthSession()

/**
 *  Sign in with OAuth component.
 */
export function SignInWithOAuth() {
  useWarmUpBrowser()

  const googleOAuthHandler = useOAuthHandler({ strategy: 'oauth_google' })
  const appleOAuthHandler = useOAuthHandler({ strategy: 'oauth_apple' })

  const translate = useTranslate()

  return (
    <>
      <Button
        backgroundColor="#4285F4"
        icon={Icon.BrandGoogle}
        onClick={googleOAuthHandler}
        variant="primary"
      >
        {translate('authentication.oauth.logInWithGoogle')}
      </Button>
      <Button
        backgroundColor="#000000"
        icon={Icon.BrandApple}
        onClick={appleOAuthHandler}
        variant="primary"
      >
        {translate('authentication.oauth.logInWithApple')}
      </Button>
    </>
  )
}

function useOAuthHandler(useOAuthParams: Parameters<typeof useOAuth>[0]) {
  const { startOAuthFlow } = useOAuth(useOAuthParams)

  return useCallback(async () => {
    const { createdSessionId, setActive } = await startOAuthFlow()

    if (createdSessionId) {
      setActive?.({ session: createdSessionId })
    }
  }, [startOAuthFlow])
}
