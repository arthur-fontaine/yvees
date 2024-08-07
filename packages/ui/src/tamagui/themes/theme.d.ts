import type { Variable } from 'tamagui'

type ThemeKeys =
  | 'backgroundColor'
  | 'cardBackgroundColor'
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
export type Theme = Record<ThemeKeys, Variable | number | string>
