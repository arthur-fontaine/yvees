import React from 'react'
import { Button, ThemeProvider } from 'ui'

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
