import { createRoute } from 'agrume'
import React from 'react'
import { Button, ThemeProvider } from 'ui'

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
        icon={<p>🚀</p>}
        onPress={() => hello().then(console.log)}
      >
        Click me
      </Button>
    </ThemeProvider>
  )
}
