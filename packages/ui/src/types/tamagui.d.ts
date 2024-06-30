import type { UnionToIntersection } from './union-to-intersection'
import type tamaguiConfig from '../tamagui/tamagui.config'

export type TamaguiConfig = typeof tamaguiConfig

type UnionedFonts = TamaguiConfig['fonts'][keyof TamaguiConfig['fonts']]
type MergedFonts = {
  [K in keyof UnionedFonts]: UnionedFonts[K]
}
type AllFonts = {
  [Font in keyof TamaguiConfig['fonts']]: {
    [K in keyof MergedFonts]: UnionToIntersection<MergedFonts[K]>
  }
}

declare module 'tamagui' {
  interface TamaguiCustomConfig extends TamaguiConfig {
    fonts: AllFonts
  }
}

declare module 'ui' {
  interface TamaguiCustomConfig extends TamaguiConfig {
    fonts: AllFonts
  }
}
