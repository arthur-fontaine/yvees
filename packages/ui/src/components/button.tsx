import React from 'react'
import type { GetProps } from 'tamagui'
import { Button as TamaguiButton } from 'tamagui'

import type { Icon } from './icon/icon'
import { withProps } from '../utils/with-props'
import { withVariants } from '../utils/with-variants'

interface ButtonProps {
  backgroundColor?: string
  buttonMd?: boolean
  children?: string
  disabled?: boolean
  icon?: typeof Icon[keyof typeof Icon] | undefined
  onClick?: GetProps<typeof TamaguiButton>['onPress']
}

export const Button = withVariants<
  'cancel' | 'empty' | 'primary' | 'secondary',
  GetProps<typeof TamaguiButton>
>(
  {
    $defaults: {
      borderRadius: '$mediumSizedElement',
      borderWidth: 0,
      cursor: 'pointer',
      padding: '$normal',
    },
    cancel: {
      backgroundColor: '$cancelButtonBackground',
      color: '$cancelButtonTextColor',
      hoverStyle: {
        backgroundColor: '$cancelButtonHoverBackground',
      },
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
  ({ variant }, {
    backgroundColor,
    buttonMd,
    children,
    disabled,
    icon,
    onClick,
  }: ButtonProps) => {
    const variantStyles = { ...variant }
    if (backgroundColor) {
      variantStyles.backgroundColor = backgroundColor
    }
    return (
        <TamaguiButton
          alignItems="center"
          display="flex"
          flexDirection="row"
          fontSize={buttonMd ? '$buttonMd' : '$button'}
          fontWeight={buttonMd ? '$buttonMd' : '$button'}
          {...(
            icon
            && { icon: withProps(icon as never, { size: 16, strokeWidth: 3 }) }
          )}
          disabled={disabled || false}
          justifyContent="center"
          onPress={onClick}
          unstyled
          {...variantStyles}
          hoverStyle={{
            backgroundColor:
              backgroundColor || variant.hoverStyle?.backgroundColor,
          }}
          opacity={disabled ? 0.5 : 1}
        >
            {children}
        </TamaguiButton>
    )
  },
)
