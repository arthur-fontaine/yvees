import type { Variable } from 'tamagui'

type ThemeKeys = never // Add keys like `'a' | 'b' | 'c'` here
export type Theme = Record<ThemeKeys, Variable | number | string>
