import { useCallback, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type { Input as TamaguiInput } from 'tamagui'

interface AuthFormState {
  codes: string[]
  confirmPassword: string
  emailAddress: string
  firstName: string
  password: string
  pendingVerification: boolean
  showConfPassword: boolean
  showPassword: boolean
}

/**
 * Authentication form hook.
 */
export function useAuthForm() {
  const [formState, setFormState] = useState<AuthFormState>({
    codes: Array(6).fill(''),
    confirmPassword: '',
    emailAddress: '',
    firstName: '',
    password: '',
    pendingVerification: false,
    showConfPassword: true,
    showPassword: true,
  })

  const refs = useRef<RefObject<TamaguiInput>[]>(
    Array(6).fill(undefined).map(() => useRef<TamaguiInput>(null)),
)

  const setFormValue = useCallback(
    (key: keyof AuthFormState, value: boolean | string | string[]) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: value,
    }))
  },
[],
)

  const handleCodeChange = useCallback((text: string, index: number) => {
    if (text.length > 1) {
      return
    }
    const newCodes = [...formState.codes!]
    newCodes[index] = text
    setFormValue('codes', newCodes)
    if (text !== '' && index < 5) {
      refs.current[index + 1]?.current?.focus()
    }
  }, [formState.codes, setFormValue])

  return {
    ...formState,
    handleCodeChange,
    refs: refs.current,
    setFormValue,
  }
}
