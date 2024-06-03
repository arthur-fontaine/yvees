import React from 'react'
import type { GetProps } from 'tamagui'
import { Button as TamaguiButton } from 'tamagui'

import type { Icon } from './icon'
import { withProps } from '../utils/with-props'
import { withVariants } from '../utils/with-variants'

interface ButtonProps {
  children?: string
  icon?: typeof Icon[keyof typeof Icon]
  onClick?: () => void
}

// eslint-disable-next-line ts/naming-convention
export const Button = withVariants<
  'primary' | 'secondary',
  GetProps<typeof TamaguiButton>
>(
  {
    $defaults: {
      borderRadius: '$mediumSizedElement',
      borderWidth: 0,
      cursor: 'pointer',
      fontSize: '$button',
      fontWeight: '$button',
      padding: '$normal',
    },
    primary: {
      backgroundColor: '$primaryButtonBackground',
      color: '$primaryButtonTextColor',
      hoverStyle: {
        backgroundColor: '$primaryButtonHoverBackground',
      },
    },
    secondary: {
      backgroundColor: '$secondaryButtonBackground',
      color: '$secondaryButtonTextColor',
      hoverStyle: {
        backgroundColor: '$secondaryButtonHoverBackground',
      },
    },
  },
)(
  ({ variant }, { children, icon, onClick }: ButtonProps) => {
    return (
      <TamaguiButton
        alignItems="center"
        display="flex"
        flexDirection="row"
        icon={icon && withProps(icon, { size: 16, strokeWidth: 3 })}
        justifyContent="center"
        onPress={onClick}
        unstyled
        {...variant}
      >
        {children}
      </TamaguiButton>
    )
  },
)
