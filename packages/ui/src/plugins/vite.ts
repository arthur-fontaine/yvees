import process from 'node:process'

import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin'

import { getTamaguiConfigPath } from './utils/get-tamagui-config-path'

/**
 * The UI plugin for Vite.
 */
export async function ui(env: 'native' | 'web') {
  const { tamaguiConfig } = env === 'native' ? await import('../tamagui/configs/tamagui-native-config')
    : await import('../tamagui/configs/tamagui-web-config')

  const tamaguiOptions: Parameters<typeof tamaguiPlugin>[0] = {
    ...tamaguiConfig.themeConfig,
    config: getTamaguiConfigPath(env),
  }

  return [
    tamaguiPlugin(tamaguiOptions),

    // optional, adds the optimizing compiler:
    // @ts-expect-error NODE_ENV is in process.env
    process.env.NODE_ENV === 'production'
      ? tamaguiExtractPlugin(tamaguiOptions)
      : undefined,
  ]
}
