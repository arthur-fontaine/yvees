import { useState } from 'react'

/**
 * Error handling hook.
 */
export function useErrorHandling() {
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [otpError, setOtpError] = useState('')
  const [signError, setSignError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format')
      return
    }
    setEmailError('')
  }

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long')
      return
    }
    setPasswordError('')
  }

  const validate2Password = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      return
    }
    setConfirmPasswordError('')
  }

  const validateOtp = (otp: string) => {
    if (otp.length !== 6) {
      setOtpError('OTP have 6 digits')
      return
    }
    setOtpError('')
  }

  const handleSignInError = () => {
    setSignError('Your email or password is incorrect')
  }

  const handleSignUpError = () => {
    setSignError('An error occurred while signing up')
  }

  return {
    confirmPasswordError,
    emailError,
    handleSignInError,
    handleSignUpError,
    otpError,
    passwordError,
    signError,
    validate2Password,
    validateEmail,
    validateOtp,
    validatePassword,
  }
}
