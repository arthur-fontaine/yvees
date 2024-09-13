import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import React from 'react'

import { SignInForm } from './components/sign-in'

/**
 * Authentication screen.
 */
export function Authentication() {
  return (
      <>
          <SignedOut>
              <SignInForm />
          </SignedOut>
          <SignedIn>
              <UserButton />
          </SignedIn>
      </>
  )
}
