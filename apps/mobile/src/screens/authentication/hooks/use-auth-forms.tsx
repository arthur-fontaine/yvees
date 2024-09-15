import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { useCallback, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type { Input as TamaguiInput } from 'tamagui'

import { userService } from '../../../services/user-service/user-service'
import { serverImpls } from '../../../shared/utils/server-impls'

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

export const createUser = createRoute(
  DI.provide(async function* ({ clerkUserId, name }) {
    const { createUser } = yield * DI.requireService(userService)
    await createUser({ clerkUserId, name })
    return { success: true }
  }, serverImpls),
  {
    path: '/create-user',
  },
)

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

/**
 *  Set the user's name.
 */
export async function setCreateUser(name: string, userId: string) {
  await createUser({ clerkUserId: userId, name })
  return { success: true }
}
