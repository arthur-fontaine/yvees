import '../types/tamagui.js'

import { createTamagui } from 'tamagui'

import { sharedTamaguiConfig } from './tamagui-shared-config.js'

export const tamaguiConfig = createTamagui({
  ...sharedTamaguiConfig,
  // TODO: Add animations
})
