import './types/tamagui.d.ts'

import { createTamagui } from '@tamagui/core'

import { montserratFont } from './tamagui/fonts/montserrat-font'
import { montserratAlternatesFont } from './tamagui/fonts/montserrat-alternates-font'
import { lightTheme } from './tamagui/themes/light-theme'
import { tokens } from './tamagui/tokens'
import { createAnimations } from '@tamagui/animations-react-native'

export const tamaguiConfig = createTamagui({
  fonts: {
    body: montserratFont,
    title: montserratAlternatesFont,
  },
  themes: {
    light: lightTheme,
  },
  tokens,
  animations: createAnimations({
    fast: {
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      damping: 20,
      stiffness: 60,
    },
  })
})

export default tamaguiConfig
