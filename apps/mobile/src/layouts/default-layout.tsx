import React from 'react'
import { View } from 'react-native'

interface DefaultLayoutProps extends React.PropsWithChildren { }

/**
 * The default layout for the application.
 */
export function DefaultLayout(props: DefaultLayoutProps) {
  return <View style={{ flex: 1 }}>{props.children}</View>
}
