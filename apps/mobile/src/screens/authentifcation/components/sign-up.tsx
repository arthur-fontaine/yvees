import { useSignUp } from '@clerk/clerk-expo'
import React from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button, Icon, Input, OtpInput, Title1 } from 'ui'

import { useAuthForm } from '../hook/use-auth-forms'
import { useErrorHandling } from '../hook/use-error-handle'

/**
 *  Sign up component.
 */
export function SignUp() {
  const { isLoaded, setActive, signUp } = useSignUp()
  const {
    codes,
    confirmPassword,
    emailAddress,
    firstName,
    handleCodeChange,
    password,
    pendingVerification,
    refs,
    setFormValue,
    showConfPassword,
    showPassword,
  } = useAuthForm()

    const {
    confirmPasswordError,
    emailError,
    handleSignUpError,
    otpError,
    passwordError,
    signError,
    validate2Password,
    validateEmail,
    validateOtp,
    validatePassword,
  } = useErrorHandling()

  // const [errorMessages, setErrorMessages] = React.useState<string[]>()

  // start the sign up process.
  const onSignUpPress = async () => {
    validatePassword(password)
    validate2Password(password, confirmPassword)
    validateEmail(emailAddress)
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        firstName,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setFormValue('pendingVerification', true)
    }
 catch (err: any) {
      handleSignUpError()
    }
  }

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    validateOtp(codes.join(''))
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: codes.join(''),
      })
      await setActive({ session: completeSignUp.createdSessionId })
    }
 catch (err: any) {
      console.error(JSON.stringify(err, undefined, 2))
    }
  }

  return (
    <View>
      {!pendingVerification && (
        <View style={styles.container}>
          <View marginBottom={24}>
            <Title1 iconLeft={Icon.LogIn} variant="default">
              Inscrivez-vous
            </Title1>
          </View>
          <Input
            onChangeText={text => setFormValue('firstName', text)}
            placeholder="First Name..."
            value={firstName}
            variant="default"
          />
          <View>
            <Input
              autoCapitalize="none"
              error={emailError || signError}
              onChangeText={text => setFormValue('emailAddress', text)}
              placeholder="Email... "
              value={emailAddress}
              variant="default"
            />
          </View>
          <View>
            <Input
              action={{
                icon: showPassword ? Icon.EyeOff : Icon.Eye,
                onClick: () => setFormValue('showPassword', !showPassword),
              }}
              error={passwordError || signError}
              onChangeText={text => setFormValue('password', text)}
              placeholder="Password... "
              secureTextEntry={showPassword}
              value={password}
              variant="default"
            />
          </View>
          <View>
            <Input
              action={{
                icon: showConfPassword ? Icon.EyeOff : Icon.Eye,
                onClick: () => setFormValue('showConfPassword', !showConfPassword),
              }}
              error={confirmPasswordError || signError}
              onChangeText={text => setFormValue('confirmPassword', text)}
              placeholder="Confirm password... "
              secureTextEntry={showConfPassword}
              value={confirmPassword}
              variant="default"
            />
          </View>
          <Button onClick={onSignUpPress} variant="primary">Inscription</Button>
        </View>
      )}
      {pendingVerification && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.containerCode}>
            <Title1 variant="default">Code de vérification</Title1>
            <Text>
              Entrez le code de vérification reçu par
              par mail a l’adresse suivante:
            </Text>
            <OtpInput
              codes={codes}
              error={otpError}
              onChangeCode={handleCodeChange}
              refs={refs}
            />
            <Button onClick={onPressVerify} variant="primary">Verify Code</Button>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  containerCode: {
    gap: 24,
  },
})
