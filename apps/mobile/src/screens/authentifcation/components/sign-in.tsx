import { useSignIn } from '@clerk/clerk-expo'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input, Title1 } from 'ui'

import { useAuthForm } from '../hook/use-auth-forms'
import { useErrorHandling } from '../hook/use-error-handle'

/**
 * Sign in component.
 */
export function SignIn() {
  const { isLoaded, setActive, signIn } = useSignIn()

    const {
    emailAddress,
    handleEmailChange,
    handlePasswordChange,
    password,
    setShowPassword,
    showPassword,
  } = useAuthForm()

  const {
    emailError,
    handleSignInError,
    passwordError,
    signInError,
    validateEmail,
    validatePassword,
  } = useErrorHandling()

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
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId })
    }
 catch (err) {
      handleSignInError(err)
    }
  }

  return (
    <View style={styles.container}>
      <View marginBottom={24}>
        <Title1 iconLeft={Icon.LogIn} variant="default">
          Connectez-vous
        </Title1>
      </View>
      <View>
        <Input
          autoCapitalize="none"
          error={emailError || signInError}
          onChangeText={handleEmailChange}
          placeholder="Email..."
          value={emailAddress}
          variant="default"
        >
        </Input>
      </View>

      <View>
        <Input
          action={{
          icon: showPassword ? Icon.EyeOff : Icon.Eye,
          onClick: () => setShowPassword(!showPassword),
          }}
          error={passwordError || signInError}
          onChangeText={handlePasswordChange}
          placeholder="Password..."
          secureTextEntry={showPassword}
          value={password}
          variant="default"
        >
        </Input>
      </View>
      <Button
        icon={Icon.Heart}
        onClick={onSignInPress}
        variant="primary"
      >
        Sign in
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
