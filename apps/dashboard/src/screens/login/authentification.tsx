import { SignedOut } from '@clerk/clerk-react'
import React from 'react'
import { SignInForm } from './components/sign-in'

/**
 * Authentification component.
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
