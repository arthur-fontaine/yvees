import { ClerkProvider } from '@clerk/clerk-react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app'
import './global.css'
import { Toaster } from './shared/components/ui/toaster'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PK

if (!PUBLISHABLE_KEY) {
  // eslint-disable-next-line fp/no-throw
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <App />
            <Toaster />
        </ClerkProvider>
    </React.StrictMode>,
)
