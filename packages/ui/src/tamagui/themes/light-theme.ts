import type { Theme } from './theme'
import { tokens } from '../tokens'

export const lightTheme: Theme = {
  backgroundColor: tokens.color.beige,
  defaultSeparatorColor: tokens.color.orangeLight,
  defaultTitleIconColor: tokens.color.orange,
  defaultTitleTextColor: tokens.color.brown,
  error: tokens.color.red,
  primaryButtonBackground: tokens.color.orange,
  primaryButtonHoverBackground: tokens.color.orangeDark,
  primaryButtonTextColor: tokens.color.white,
  secondaryButtonBackground: tokens.color.silver,
  secondaryButtonHoverBackground: tokens.color.silverDark,
  secondaryButtonTextColor: tokens.color.black,
}
