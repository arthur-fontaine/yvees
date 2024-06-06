import { useState } from 'react'

/**
 *  Authentication form hook.
 */
export function useAuthForm() {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)

  const handleEmailChange = (email: string) => {
    setEmailAddress(email)
  }

  const handlePasswordChange = (password: string) => {
    setPassword(password)
  }

  return {
    emailAddress,
    handleEmailChange,
    handlePasswordChange,
    password,
    setShowPassword,
    showPassword,
  }
}
