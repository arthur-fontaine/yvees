import '../types/tamagui.js'

import { createAnimations } from '@tamagui/animations-react-native'
import { createTamagui } from 'tamagui'

import { sharedTamaguiConfig } from './tamagui-shared-config.js'

export const tamaguiConfig = createTamagui({
  ...sharedTamaguiConfig,
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
  }),
})
