import { createTamagui } from 'tamagui'

import { interFont } from './fonts/inter-font'
import { darkTheme } from './themes/dark-theme'
import { lightTheme } from './themes/light-theme'
import { tokens } from './tokens'

export const tamaguiConfig = createTamagui({
  fonts: {
    body: interFont,
  },
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
  tokens,
})

// make TypeScript type everything based on the config
type TamaguiConfig = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends TamaguiConfig { }
}
declare module 'tamagui' {
  interface TamaguiCustomConfig extends TamaguiConfig { }
}
