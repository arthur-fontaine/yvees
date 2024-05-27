import React from 'react'
import { Button as TamaguiButton } from 'tamagui'

import type { Props } from '../types/props'

interface ButtonProps extends Props<typeof TamaguiButton> { }

/**
 * Button component.
 */
export function Button(props: ButtonProps) {
  return (
    <TamaguiButton
      unstyled
      {...props}
    />
  )
}
