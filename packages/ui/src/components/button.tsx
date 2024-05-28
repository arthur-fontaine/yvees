import React from 'react'
import { Button as TamaguiButton } from 'tamagui'

import type { GetProps } from '../types/get-props'

interface ButtonProps extends GetProps<typeof TamaguiButton> { }

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
