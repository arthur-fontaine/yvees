import '../types/tamagui.js'

import type { CreateTamaguiProps } from 'tamagui'

import { sharedTamaguiConfig } from './tamagui-shared-config.js'

export const webTamaguiConfig = {
  ...sharedTamaguiConfig,
  // TODO: Add animations
} satisfies CreateTamaguiProps
