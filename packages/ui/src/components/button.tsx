import React from 'react'
import type { GetProps, TamaguiElement } from 'tamagui'
import { Button as TamaguiButton } from 'tamagui'

import type { Icon } from './icon/icon'
import { withProps } from '../utils/with-props'
import { withVariants } from '../utils/with-variants'

interface ButtonProps {
  backgroundColor?: string
  buttonMd?: boolean
  children?: string
  disabled?: boolean
  icon?: (typeof Icon)[keyof typeof Icon] | undefined
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
      cursor: 'pointer',
      hoverStyle: {
        backgroundColor: '$cancelButtonHoverBackground',
      },
    },
    empty: {
      backgroundColor: 'transparent',
      cursor: 'pointer',
      hoverStyle: {
        backgroundColor: 'transparent',
      },
    },
    primary: {
      backgroundColor: '$primaryButtonBackground',
      color: '$primaryButtonTextColor',
      cursor: 'pointer',
      hoverStyle: {
        backgroundColor: '$primaryButtonHoverBackground',
      },
    },
    secondary: {
      backgroundColor: '$secondaryButtonBackground',
      color: '$secondaryButtonTextColor',
      cursor: 'pointer',
      hoverStyle: {
        backgroundColor: '$secondaryButtonHoverBackground',
      },
    },
  },
)((
  { variant },
  {
    backgroundColor,
    buttonMd,
    children,
    disabled,
    icon,
    onClick,
  }: ButtonProps,
  ref?: React.ForwardedRef<TamaguiElement | null> | undefined,
) => {
  const variantStyles = { ...variant }
  if (backgroundColor) {
    variantStyles.backgroundColor = backgroundColor
  }

  const disabledStyles = disabled
    ? {
      cursor: 'not-allowed',
      opacity: 0.7,
    }
    : {}
  return (
      <TamaguiButton
        alignItems="center"
        display="flex"
        flexDirection="row"
        fontSize={buttonMd ? '$buttonMd' : '$button'}
        fontWeight={buttonMd ? '$buttonMd' : '$button'}
        ref={ref}
        {...(icon && {
        icon: withProps(icon as never, { size: 16, strokeWidth: 3 }),
      })}
        disabled={disabled || false}
        justifyContent="center"
        onPress={onClick}
        unstyled
        {...variantStyles}
        {...disabledStyles}
        hoverStyle={{
        backgroundColor: backgroundColor || variant.hoverStyle?.backgroundColor,
      }}
      >
          {children}
      </TamaguiButton>
  )
})
