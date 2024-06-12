import { createRoute } from 'agrume'
import React from 'react'
import { Button, Icon, Title1 } from 'ui'

import { useTranslate } from '../../app/hooks/use-translate'
import { DefaultLayout } from '../../layouts/default-layout'

const hello = createRoute(async () => {
  return 'HELLO'
})

/**
 * Home screen component.
 */
export function HomeScreen() {
  const translate = useTranslate()

  return (
    <DefaultLayout>
      <Title1 variant="default">{translate('home.title')}</Title1>
      <Button
        icon={Icon.Heart}
        onClick={() => hello().then(console.log)}
        variant="primary"
      >
        {translate('home.button')}
      </Button>
    </DefaultLayout>
  )
}
