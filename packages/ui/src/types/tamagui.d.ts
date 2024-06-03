import type tamaguiConfig from '../tamagui.config'

export type TamaguiConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends TamaguiConfig { }
}

declare module 'ui' {
  interface TamaguiCustomConfig extends TamaguiConfig { }
}
