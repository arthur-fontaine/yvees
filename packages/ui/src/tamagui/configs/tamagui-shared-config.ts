import '../types/tamagui.js'

import type { CreateTamaguiProps } from 'tamagui'

import { montserratAlternatesFont } from './../fonts/montserrat-alternates-font'
import { montserratFont } from './../fonts/montserrat-font'
import { lightTheme } from './../themes/light-theme'
import { tokens } from './../tokens'

export const sharedTamaguiConfig = {
  fonts: {
    body: montserratFont,
    title: montserratAlternatesFont,
  },
  themes: {
    light: lightTheme,
  },
  tokens,
} satisfies CreateTamaguiProps
