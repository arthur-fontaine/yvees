import React from 'react'
import type { GetProps } from 'tamagui'
import { H1 as TamaguiH1, View as TamaguiView } from 'tamagui'

import { withVariants } from '../../utils/with-variants'
import type { Icon } from '../icon/icon'

interface H1Props {
  children?: string
  color?: string
  iconColor?: string
  iconLeft?: typeof Icon[keyof typeof Icon] | undefined
  iconRight?: typeof Icon[keyof typeof Icon] | undefined
}

/**
 * Title component.
 */
// eslint-disable-next-line ts/naming-convention
export const Title1 = withVariants<
  'default',
  GetProps<typeof TamaguiView>
>(
  {
    $defaults: {
      alignItems: 'center',
      borderRadius: '$mediumSizedElement',
      borderWidth: 0,
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
    },
    default: {},
  },
)(

  ({ variant }, {
    children,
    color,
    iconColor,
    // eslint-disable-next-line ts/naming-convention
    iconLeft: IconLeft,
    // eslint-disable-next-line ts/naming-convention
    iconRight: IconRight,
  }: H1Props) => {
    return (
      <TamaguiView
        {...variant}
      >
        {IconLeft && (
          <TamaguiView>
            <IconLeft color={iconColor || '$defaultTitleIconColor'} size={24} strokeWidth={3} />
          </TamaguiView>
        )}
        <TamaguiH1
          alignItems="center"
          color={color || '$defaultTitleTextColor'}
          display="flex"
          flexDirection="row"
          fontFamily="$title"
          fontSize="$title1"
          fontWeight="$title1"
          lineHeight="$title1"
          unstyled
        >
          {children}
        </TamaguiH1>
        {IconRight && (
          <TamaguiView>
            <IconRight color={iconColor || '$defaultTitleIconColor'} size={24} strokeWidth={3} />
          </TamaguiView>
        )}
      </TamaguiView>
    )
  },
)
