import React from 'react'
import type { ThemeName } from 'tamagui'
import { TamaguiProvider, Theme } from 'tamagui'

import { tamaguiConfig } from '../tamagui.config'

interface ThemeProviderProps extends React.PropsWithChildren {
  theme?: ThemeName
}

/**
 * Theme provider component.
 */
export function ThemeProvider(props: ThemeProviderProps) {
  return (
      <TamaguiProvider config={tamaguiConfig}>
          {/* eslint-disable-next-line unicorn/no-null */}
          <Theme name={props.theme ?? null}>
              {props.children}
          </Theme>
      </TamaguiProvider>
  )
}
