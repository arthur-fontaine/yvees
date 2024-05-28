import { createRequire } from 'node:module'
import path from 'node:path'
import process from 'node:process'

import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin'

import packageJson from '../../package.json'
import { tamaguiConfig } from '../theme/tamagui-config'

const tamaguiOptions: Parameters<typeof tamaguiPlugin>[0] = {
  ...tamaguiConfig.themeConfig,
  config: path.relative(
    process.cwd(),
    path.resolve(
      path.dirname(createRequire(import.meta.url).resolve(`${packageJson.name}/package.json`)),
      'src/theme/tamagui-config.ts',
    ),
  ),
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
