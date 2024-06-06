import { createRoute } from 'agrume'
import React from 'react'
import { Button, Icon, Title1 } from 'ui'

import { DefaultLayout } from '../../layouts/default-layout'

const hello = createRoute(async () => {
  return 'HELLO'
})

/**
 * Home screen component.
 */
export function HomeScreen() {
  return (
    <DefaultLayout>
      <Title1 variant="default">Hello, world!</Title1>
      <Button
        icon={Icon.Heart}
        onClick={() => hello().then(console.log)}
        variant="primary"
      >
        Click me
      </Button>
    </DefaultLayout>
  )
}
