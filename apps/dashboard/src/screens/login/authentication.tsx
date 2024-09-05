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
        {/* TODO : setup to home page + remove UserButton */}
        <h1>DASHBOARD</h1>
        <UserButton />
      </SignedIn>
    </>
  )
}
