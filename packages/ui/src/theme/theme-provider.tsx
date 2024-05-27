import React from 'react'
import type { ThemeName } from 'tamagui'
import { TamaguiProvider, Theme } from 'tamagui'

import { tamaguiConfig } from './tamagui-config'

interface ThemeProviderProps extends React.PropsWithChildren {
  theme: ThemeName
}

/**
 * Theme provider component.
 */
export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name={props.theme}>
        {props.children}
      </Theme>
    </TamaguiProvider>
  )
}
