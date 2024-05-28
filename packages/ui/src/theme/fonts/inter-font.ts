// NOTE: This is temporary to make the example work.

/* eslint-disable ts/naming-convention */

import { createFont } from 'tamagui'

export const interFont = createFont({
  face: {
    700: { italic: 'InterBold-Italic', normal: 'InterBold' },
    800: { italic: 'InterBold-Italic', normal: 'InterBold' },
    900: { italic: 'InterBold-Italic', normal: 'InterBold' },
  },
  family: 'Inter, Helvetica, Arial, sans-serif',
  letterSpacing: {
    4: 0,
    8: -1,
  },
  lineHeight: {
    1: 17,
    2: 22,
    3: 25,
  },
  size: {
    1: 12,
    2: 14,
    3: 15,
  },
  weight: {
    4: '300',
    6: '600',
  },
})
