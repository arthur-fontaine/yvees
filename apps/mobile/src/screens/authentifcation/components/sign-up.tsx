import { useSignUp } from '@clerk/clerk-expo'
import React, { useRef, useState } from 'react'
import type { RefObject } from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import type { TextInput } from 'react-native'
import type { Input as TamaguiInput } from 'tamagui'
import { Button, Icon, Input, OtpInput, Title1 } from 'ui'

/**
 *  Sign up component.
 */
export function SignUp() {
  const { isLoaded, setActive, signUp } = useSignUp()

  const [firstName, setFirstName] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(true)
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [showConfPassword, setShowConfPassword] = React.useState(true)
  const [pendingVerification, setPendingVerification] = React.useState(false)

  const [codes, setCodes] = useState<string[] | undefined>(Array(6).fill(''))
  const refs: RefObject<TextInput>[] = [
    useRef<TamaguiInput>(null),
    useRef<TamaguiInput>(null),
    useRef<TamaguiInput>(null),
    useRef<TamaguiInput>(null),
    useRef<TamaguiInput>(null),
    useRef<TamaguiInput>(null),
  ]
  const [errorMessages, setErrorMessages] = useState<string[]>()

  // start the sign up process.
  const onSignUpPress = async () => {
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
      setPendingVerification(true)
    }
 catch (err: any) {
      console.error(JSON.stringify(err, undefined, 2))
    }
  }

  const onChangeCode = (text: string, index: number) => {
    if (text.length > 1) {
      return
    }
    setErrorMessages(undefined)
    const newCodes = [...codes!]
    newCodes[index] = text
    setCodes(newCodes)
    if (text !== '' && index < 5) {
      refs[index + 1]!.current?.focus()
    }
  }

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: codes?.join(''),
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
            onChangeText={firstName => setFirstName(firstName)}
            placeholder="First Name..."
            value={firstName}
            variant="default"
          >
          </Input>
          <View>
            <Input
              autoCapitalize="none"
              onChangeText={email => setEmailAddress(email)}
              placeholder="Email... "
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
              onChangeText={password => setPassword(password)}
              placeholder="Password... "
              secureTextEntry={showPassword}
              value={password}
              variant="default"
            >
            </Input>
          </View>
          <View>
            <Input
              action={{
              icon: showConfPassword ? Icon.EyeOff : Icon.Eye,
              onClick: () => setShowConfPassword(!showConfPassword),
              }}
              onChangeText={
                confirmPassword => setConfirmPassword(confirmPassword)
              }
              placeholder="Confirm password... "
              secureTextEntry={showConfPassword}
              value={confirmPassword}
              variant="default"
            >
            </Input>
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
              codes={codes!}
              errorMessages={errorMessages}
              onChangeCode={onChangeCode}
              refs={refs}
            />
            <Button onClick={onPressVerify} variant="primary">Verify Email</Button>
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
