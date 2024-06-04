import React from 'react'
import type { GetProps } from 'tamagui'
import { Input as TamaguiInput, View as TamaguiView } from 'tamagui'

import { Button } from './button'
import type { Icon } from './icon/icon'
import { withVariants } from '../utils/with-variants'

interface InputProps {
  action?: {
    icon: typeof Icon[keyof typeof Icon]
    onClick: () => void
  }
  icon?: typeof Icon[keyof typeof Icon]
  onChangeText?: (e: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  value?: string
}

/**
 * Input component.
 */
// eslint-disable-next-line ts/naming-convention
export const Input = withVariants<
  'default',
  GetProps<typeof TamaguiView>
>(
  {
    $defaults: {
      alignItems: 'center',
      backgroundColor: '#EDEDED',
      borderRadius: '$mediumSizedElement',
      borderWidth: 0,
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: '$normal',
    },
    default: {},
  },
)(({ variant }, {
  action,
  // eslint-disable-next-line ts/naming-convention
  icon: Icon,
  onChangeText,
  placeholder,
  secureTextEntry,
  value,
}: InputProps) => {
  return (
    <TamaguiView
      {...variant}
      {...(action ? { paddingRight: '0' } : {})}
    >
      {Icon && (
        <TamaguiView marginRight={8} opacity={0.3}>
          <Icon size={16} strokeWidth={3} />
        </TamaguiView>
      )}
      <TamaguiInput
        flex={1}
        fontFamily="$body"
        fontSize="$button"
        fontWeight="$button"
        onChangeText={onChangeText}
        outlineWidth={0}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        unstyled
      >
        {value}
      </TamaguiInput>
      <Button
        icon={action?.icon}
        onClick={action?.onClick}
        variant="secondary"
      />
    </TamaguiView>
  )
})
