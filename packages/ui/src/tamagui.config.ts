import './types/tamagui.d.ts'

import { createTamagui } from 'tamagui'

import { montserratFont } from './tamagui/fonts/montserrat-font'
import { lightTheme } from './tamagui/themes/light-theme'
import { tokens } from './tamagui/tokens'

export const tamaguiConfig = createTamagui({
  fonts: {
    body: montserratFont,
  },
  themes: {
    light: lightTheme,
  },
  tokens,
})

export default tamaguiConfig
