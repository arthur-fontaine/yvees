import '../types/tamagui.js'

import { createRequire } from 'node:module'

import { createTamagui } from 'tamagui'

import type { nativeTamaguiConfig } from './configs/tamagui-native-config'
import type { webTamaguiConfig } from './configs/tamagui-web-config'

globalThis.require ??= createRequire(import.meta.url)

type Conf = typeof nativeTamaguiConfig & typeof webTamaguiConfig

export const tamaguiConfig = createTamagui<Conf>(
  process.env['VITE'] !== undefined ? require('./configs/tamagui-web-config')
    : require('./configs/tamagui-native-config')
)

export default tamaguiConfig
