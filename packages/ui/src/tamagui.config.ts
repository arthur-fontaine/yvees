import './types/tamagui.d.ts'

import { createTamagui } from '@tamagui/core'

import { montserratFont } from './tamagui/fonts/montserrat-font'
import { montserratAlternatesFont } from './tamagui/fonts/montserrat-alternates-font'
import { lightTheme } from './tamagui/themes/light-theme'
import { tokens } from './tamagui/tokens'

export const tamaguiConfig = createTamagui({
  fonts: {
    body: montserratFont,
    title: montserratAlternatesFont,
  },
  themes: {
    light: lightTheme,
  },
  tokens,
})

export default tamaguiConfig
