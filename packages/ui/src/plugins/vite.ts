import process from 'node:process'

import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin'

import { getTamaguiConfigPath } from './utils/get-tamagui-config-path'
import { tamaguiConfig } from '../tamagui/tamagui.config'

const tamaguiOptions: Parameters<typeof tamaguiPlugin>[0] = {
  ...tamaguiConfig.themeConfig,
  config: getTamaguiConfigPath(),
}

/**
 * The UI plugin for Vite.
 */
export function ui() {
  return [
    tamaguiPlugin(tamaguiOptions),

    // optional, adds the optimizing compiler:
    process.env.NODE_ENV === 'production'
      ? tamaguiExtractPlugin(tamaguiOptions)
      : undefined,
  ]
}
