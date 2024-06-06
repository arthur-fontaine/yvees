/* eslint-disable ts/naming-convention */

import { createFont, isWeb } from 'tamagui'

export const montserratFont = createFont({
  face: {
    100: { italic: 'Montserrat-ThinItalic', normal: 'Montserrat-Thin' },
    200: { italic: 'Montserrat-ExtraLightItalic', normal: 'Montserrat-ExtraLight' },
    300: { italic: 'Montserrat-LightItalic', normal: 'Montserrat-Light' },
    400: { italic: 'Montserrat-RegularItalic', normal: 'Montserrat-Regular' },
    500: { italic: 'Montserrat-MediumItalic', normal: 'Montserrat-Medium' },
    600: { italic: 'Montserrat-SemiBoldItalic', normal: 'Montserrat-SemiBold' },
    700: { italic: 'Montserrat-BoldItalic', normal: 'Montserrat-Bold' },
    800: { italic: 'Montserrat-ExtraBoldItalic', normal: 'Montserrat-ExtraBold' },
    900: { italic: 'Montserrat-BlackItalic', normal: 'Montserrat-Black' },
  },
  family: isWeb ? 'Montserrat, Helvetica, Arial, sans-serif' : 'Montserrat',
  letterSpacing: {
    $true: -2,
  },
  lineHeight: {
    button: 16,
    caption: 12,
  },
  size: {
    button: 16,
    caption: 12,
  },
  weight: {
    button: '600',
    caption: '400',
  },
})
