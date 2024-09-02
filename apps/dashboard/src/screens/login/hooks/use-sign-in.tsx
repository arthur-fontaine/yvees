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
      setEmailError('Format de courriel invalide')
      return
    }

    if (formState.password.length < 8) {
        setPasswordError('Le mot de passe doit contenir au moins 8 caractères.')
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
        setSignError('Échec de la connexion. Veuillez réessayer.')
      }
    }
 catch (err) {
      console.error(JSON.stringify(err, undefined, 2))
      setSignError('Échec de la connexion. Veuillez réessayer.')
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
