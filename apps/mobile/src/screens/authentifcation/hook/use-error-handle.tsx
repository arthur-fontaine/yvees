import { useState } from 'react'

/**
 * Error handling hook.
 */
export function useErrorHandling() {
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signInError, setSignInError] = useState('')

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

  const handleSignInError = (error: any) => {
    setSignInError('Your email or password is incorrect')
  }

  return {
    emailError,
    handleSignInError,
    passwordError,
    signInError,
    validateEmail,
    validatePassword,
  }
}
