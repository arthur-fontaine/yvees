import React from 'react'
import type { GetProps } from 'tamagui'
import { Button as TamaguiButton } from 'tamagui'

import type { Icon } from './icon/icon'
import { withProps } from '../utils/with-props'
import { withVariants } from '../utils/with-variants'

interface ButtonProps {
  backgroundColor?: string
  children?: string
  icon?: typeof Icon[keyof typeof Icon] | undefined
  onClick?: GetProps<typeof TamaguiButton>['onPress']
}

export const Button = withVariants<
  'empty' | 'primary' | 'secondary',
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
    empty: {
      backgroundColor: 'transparent',
      hoverStyle: {
        backgroundColor: 'transparent',
      },
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
  ({ variant }, { backgroundColor, children, icon, onClick }: ButtonProps) => {
    const variantStyles = { ...variant }
    if (backgroundColor) {
      variantStyles.backgroundColor = backgroundColor
    }
    return (
      <TamaguiButton
        alignItems="center"
        display="flex"
        flexDirection="row"
        icon={icon && withProps(icon, { size: 16, strokeWidth: 3 })}
        justifyContent="center"
        onPress={onClick}
        unstyled
        {...variantStyles}
        hoverStyle={{
          backgroundColor:
            backgroundColor || variant.hoverStyle?.backgroundColor,
        }}
      >
        {children}
      </TamaguiButton>
    )
  },
)
