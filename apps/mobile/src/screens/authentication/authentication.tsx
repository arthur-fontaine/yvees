import React, { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { Box, Button, Separator } from 'ui'

import { SignIn } from './components/sign-in'
import { SignInWithOAuth } from './components/sign-in-with-oauth'
import { SignUp } from './components/sign-up'
import { useTranslate } from '../../shared/hooks/use-translate'
import { DefaultLayout } from '../../shared/layouts/default-layout'

/**
 *  Authentication screen.
 */
export function AuthenticationScreen() {
  const { isFormSignUp, toggleForm } = useAuthFormController()

  const translate = useTranslate()

  return (
      <DefaultLayout withPadding={false}>
          <Box
            backgroundColor="$cardBackgroundColor"
            borderRadius="$card"
            display="flex"
            flexDirection="column"
            gap="$large"
            justifyContent="space-between"
            marginTop="auto"
            paddingBottom={80}
            paddingHorizontal="$card"
            paddingTop="$card"
          >
              {isFormSignUp ? <SignUp /> : <SignIn />}

              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                  <Separator />
                  <View>
                      <Text style={{ color: '#F4C898', textAlign: 'center', width: 50 }}>OU</Text>
                  </View>
                  <Separator />
              </View>

              <Box gap="$large">
                  <Button
                    onClick={toggleForm}
                    variant="secondary"
                  >
                      {isFormSignUp ? translate('authentication.logIn.title') : translate('authentication.signUp.title')}
                  </Button>
                  <SignInWithOAuth />
              </Box>

          </Box>
      </DefaultLayout>
  )
}

function useAuthFormController() {
  const [isFormSignUp, setIsFormSignUp] = useState(false)

  const toggleForm = useCallback(() => {
    setIsFormSignUp(prev => !prev)
  }, [])

  return { isFormSignUp, toggleForm }
}
