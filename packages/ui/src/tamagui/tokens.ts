import { createTokens } from 'tamagui'

export const tokens = createTokens({
  color: {
    beige: '#FCF0E3',
    beigeLight: '#FFFBF5',
    black: '#000000',
    brown: '#410000',
    orange: '#E47B0C',
    orangeDark: '#D16C0A',
    orangeLight: '#F4C898',
    red: '#FF0000',
    redDark: '#D0021B',
    silver: '#EDEDED',
    silverDark: '#D6D6D6',
    white: '#FFFFFF',
  },
  radius: {
    $true: 12,
    card: 28,
    mediumSizedElement: 12,
    smallSiezdElement: 8,
  },
  size: {
    $true: 10, // TODO: adjust this value
  },
  space: {
    $true: 16,
    card: 36,
    large: 24,
    normal: 16,
    small: 8,
    xsmall: 4,
  },
  zIndex: {
    $true: 10, // TODO: adjust this value
  },
})
