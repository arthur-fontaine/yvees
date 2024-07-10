import { SignedOut } from '@clerk/clerk-react'
import React from 'react'

import { SignInForm } from './components/sign-in'

/**
 * Authentification screen.
 */
export function Authentification() {
  return (
    <>
      <SignedOut>
        <SignInForm />
      </SignedOut>
    </>
  )
}
