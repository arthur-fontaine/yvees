import { createTokens } from 'tamagui'

export const tokens = createTokens({
  color: {
    black: '#000000',
    brown: '#410000',
    orange: '#E47B0C',
    orangeDark: '#D16C0A',
    orangeLight: '#F4C898',
    red: '#FF0000',
    silver: '#EDEDED',
    silverDark: '#D6D6D6',
    white: '#FFFFFF',
  },
  radius: {
    $true: 12,
    mediumSizedElement: 12,
  },
  size: {
    $true: 10, // TODO: adjust this value
  },
  space: {
    $true: 16,
    normal: 16,
  },
  zIndex: {
    $true: 10, // TODO: adjust this value
  },
})
