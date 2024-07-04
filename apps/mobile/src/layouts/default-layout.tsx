import React from 'react'
import { Box } from 'ui'

interface DefaultLayoutProps extends React.PropsWithChildren { }

/**
 * The default layout for the application.
 */
export function DefaultLayout(props: DefaultLayoutProps) {
  return <Box flex={1} backgroundColor="$beige" padding='$normal'>{props.children}</Box>
}
