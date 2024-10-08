import { useSignIn } from '@clerk/clerk-expo'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Box, Button, Icon, Input, Title1 } from 'ui'

import { useTranslate } from '../../../shared/hooks/use-translate'
import { useAuthForm } from '../hooks/use-auth-forms'
import { useErrorHandling } from '../hooks/use-error-handle'

/**
 * Sign in component.
 */
export function SignIn() {
  const { isLoaded, setActive, signIn } = useSignIn()
  const {
    emailAddress,
    password,
    setFormValue,
    showPassword,
  } = useAuthForm()

  const {
    emailError,
    handleSignInError,
    passwordError,
    signError,
    validateEmail,
    validatePassword,
  } = useErrorHandling()

  const translate = useTranslate()

  const onSignInPress = async () => {
    if (!isLoaded) {
      return
    }

    validateEmail(emailAddress)
    validatePassword(password)

    if (emailError || passwordError) {
      return
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      })
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId })
    }
    catch (err) {
      handleSignInError()
    }
  }

  return (
      <View style={styles.container}>
          <Box marginBottom={24}>
              <Title1 iconLeft={Icon.LogIn} variant="default">
                  {translate('authentication.logIn.title')}
              </Title1>
          </Box>

          <Input
            autoCapitalize="none"
            error={emailError || signError}
            onChangeText={text => setFormValue('emailAddress', text)}
            placeholder={`${translate('misc.email')}...`}
            value={emailAddress}
            variant="default"
          />

          <Input
            action={{
          icon: showPassword ? Icon.EyeOff : Icon.Eye,
          onClick: () => setFormValue('showPassword', !showPassword),
        }}
            error={passwordError || signError}
            onChangeText={text => setFormValue('password', text)}
            placeholder={`${translate('misc.password')}...`}
            secureTextEntry={showPassword}
            value={password}
            variant="default"
          />

          <Button
            icon={Icon.LogIn}
            onClick={onSignInPress}
            variant="primary"
          >
              {translate('misc.logIn')}
          </Button>

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
})
