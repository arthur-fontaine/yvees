import { createRoute } from 'agrume'
import React from 'react'
import { Button, Icon, ThemeProvider } from 'ui'

const hello = createRoute(async () => {
  return 'Hello, world!'
})

/**
 * App component.
 */
export function App() {
  return (
    <ThemeProvider theme="light">
      <Button
        icon={Icon.Heart}
        onClick={() => hello().then(console.log)}
        variant="primary"
      >
        Click me
      </Button>
    </ThemeProvider>
  )
}
