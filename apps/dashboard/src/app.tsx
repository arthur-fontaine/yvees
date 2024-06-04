import { createRoute } from 'agrume'
import React from 'react'
import { Button, Icon, Input, ThemeProvider } from 'ui'

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

      <Input
        action={{
          icon: Icon.BrandGoogle,
          onClick: () => console.log('Search clicked'),
        }}
        error="This is an error"
        icon={Icon.Search}
        variant="default"
      />
    </ThemeProvider>
  )
}
