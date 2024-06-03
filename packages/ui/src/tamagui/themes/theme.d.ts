import type { Variable } from 'tamagui'

type ThemeKeys =
  | 'primaryButtonBackground'
  | 'primaryButtonHoverBackground'
  | 'primaryButtonTextColor'
  | 'secondaryButtonBackground'
  | 'secondaryButtonHoverBackground'
  | 'secondaryButtonTextColor'
export type Theme = Record<ThemeKeys, Variable | number | string>
