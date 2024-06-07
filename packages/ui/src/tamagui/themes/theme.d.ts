import type { Variable } from 'tamagui'

type ThemeKeys =
  | 'defaultSeparatorColor'
  | 'defaultTitleIconColor'
  | 'defaultTitleTextColor'
  | 'error'
  | 'primaryButtonBackground'
  | 'primaryButtonHoverBackground'
  | 'primaryButtonTextColor'
  | 'secondaryButtonBackground'
  | 'secondaryButtonHoverBackground'
  | 'secondaryButtonTextColor'
  |  'backgroundColor'
export type Theme = Record<ThemeKeys, Variable | number | string>
