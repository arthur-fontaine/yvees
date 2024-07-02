import { useSignIn } from '@clerk/clerk-react'
import { useState } from 'react'
import { router } from '../../../utils/router'


interface AuthFormState {
  emailAddress: string
  password: string
  pendingVerification: boolean
  showPassword: boolean
}

/**
 * Use sign-in form hook.
 */
export function useSignInForm() {
  const { isLoaded, setActive, signIn } = useSignIn()
  const [formState, setFormState] = useState<AuthFormState>({
    emailAddress: '',
    password: '',
    pendingVerification: false,
    showPassword: true,
  })
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signError, setSignError] = useState('')

  const setFormValue = (key: keyof AuthFormState, value: boolean | string) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) {
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    if (!emailRegex.test(formState.emailAddress)) {
      setEmailError('Invalid email format')
      return
    }

    if (formState.password.length < 8) {
        setPasswordError('Password must be at least 8 characters long.')
        return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: formState.emailAddress,
        password: formState.password,
      })
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('data')

      }
 else {
        console.error(JSON.stringify(signInAttempt, undefined, 2))
        setSignError('Sign-in failed. Please try again.')
      }
    }
 catch (err) {
      console.error(JSON.stringify(err, undefined, 2))
      setSignError('Sign-in failed. Please try again.')
    }
  }

  return {
    emailError,
    ...formState,
    handleSubmit,
    passwordError,
    setFormValue,
    signError,
  }
}
