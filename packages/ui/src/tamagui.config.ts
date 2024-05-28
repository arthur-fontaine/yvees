import { createTamagui } from 'tamagui'

import { interFont } from './tamagui/fonts/inter-font'
import { darkTheme } from './tamagui/themes/dark-theme'
import { lightTheme } from './tamagui/themes/light-theme'
import { tokens } from './tamagui/tokens'

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

export default tamaguiConfig
