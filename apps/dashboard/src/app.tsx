import React from 'react'
import { Button } from 'ui/components'
import { ThemeProvider } from 'ui/theme'

/**
 * App component.
 */
export function App() {
  return (
    <ThemeProvider theme="light">
      <Button
        icon={<p>🚀</p>}
      >
        Click me
      </Button>
    </ThemeProvider>
  )
}
