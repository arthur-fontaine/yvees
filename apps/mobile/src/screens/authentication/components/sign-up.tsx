import { useSignUp } from '@clerk/clerk-expo'
import React from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Box, Button, Icon, Input, OtpInput, Title1 } from 'ui'

import { useTranslate } from '../../../shared/hooks/use-translate'
import { setCreateUser, useAuthForm } from '../hooks/use-auth-forms'
import { useErrorHandling } from '../hooks/use-error-handle'
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

  const translate = useTranslate()

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
    catch {
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
      if (
        completeSignUp.createdUserId !== undefined
        && completeSignUp.createdUserId !== null) {
        await setCreateUser(firstName, completeSignUp.createdUserId)
      }
    }
    catch (err) {
      console.error(JSON.stringify(err, undefined, 2))
    }
  }

  return (
      <View>
          {!pendingVerification && (
          <View style={styles.container}>

              <Box marginBottom={24}>
                  <Title1 iconLeft={Icon.LogIn} variant="default">
                      {translate('authentication.signUp.title')}
                  </Title1>
              </Box>

              <Input
                onChangeText={text => setFormValue('firstName', text)}
                placeholder={`${translate('misc.firstName')}...`}
                value={firstName}
                variant="default"
              />

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

              <Input
                action={{
              icon: showConfPassword ? Icon.EyeOff : Icon.Eye,
              onClick: () => setFormValue('showConfPassword', !showConfPassword),
            }}
                error={confirmPasswordError || signError}
                onChangeText={text => setFormValue('confirmPassword', text)}
                placeholder={`${translate('authentication.signUp.confirmPassword')}...`}
                secureTextEntry={showConfPassword}
                value={confirmPassword}
                variant="default"
              />

              <Button onClick={onSignUpPress} variant="primary">
                  {translate('misc.signUp')}
              </Button>

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
