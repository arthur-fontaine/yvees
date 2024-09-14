/* eslint-disable ts/naming-convention */

import { createFont, isWeb } from '@tamagui/core'

export const montserratAlternatesFont = createFont({
  face: {
    100: { italic: 'MontserratAlternates-ThinItalic', normal: 'MontserratAlternates-Thin' },
    200: { italic: 'MontserratAlternates-ExtraLightItalic', normal: 'MontserratAlternates-ExtraLight' },
    300: { italic: 'MontserratAlternates-LightItalic', normal: 'MontserratAlternates-Light' },
    400: { italic: 'MontserratAlternates-RegularItalic', normal: 'MontserratAlternates-Regular' },
    500: { italic: 'MontserratAlternates-MediumItalic', normal: 'MontserratAlternates-Medium' },
    600: { italic: 'MontserratAlternates-SemiBoldItalic', normal: 'MontserratAlternates-SemiBold' },
    700: { italic: 'MontserratAlternates-BoldItalic', normal: 'MontserratAlternates-Bold' },
    800: { italic: 'MontserratAlternates-ExtraBoldItalic', normal: 'MontserratAlternates-ExtraBold' },
    900: { italic: 'MontserratAlternates-BlackItalic', normal: 'MontserratAlternates-Black' },
  },
  family: isWeb ? 'Montserrat Alternates, Helvetica, Arial, sans-serif' : 'Montserrat Alternates',
  letterSpacing: {
    $true: -2,
  },
  lineHeight: {
    title1: 32,
  },
  size: {
    $4: 16,
    title1: 24,
  },
  weight: {
    title1: '700',
  },
})
