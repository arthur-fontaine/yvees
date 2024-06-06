import { useSignIn } from '@clerk/clerk-expo'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input, Title1 } from 'ui'

/**
 * Sign in component.
 */
export function SignIn() {
  const { isLoaded, setActive, signIn } = useSignIn()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(true)
  const [passwordError, setPasswordError] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [signInError, setSignInError] = React.useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format')
    }
    else {
      setEmailError('')
    }
  }

  const validatePassword = (password: string) => {
  if (password.length < 8) {
    setPasswordError('Password must be at least 8 characters long')
  }
  else {
    setPasswordError('')
    }
  }

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
  catch (err: any) {
        setSignInError('Your email or password is incorrect')
      }
    }

  const handleEmailChange = (email: string) => {
    setEmailAddress(email)
    validateEmail(email)
  }

  const handlePasswordChange = (password: string) => {
    setPassword(password)
    validatePassword(password)
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