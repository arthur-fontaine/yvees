import React from 'react'
import type { GetProps } from 'tamagui'
import { Input as TamaguiInput, View as TamaguiView } from 'tamagui'

import { Button } from './button'
import type { Icon } from './icon/icon'
import { Caption } from './typographies/caption'
import { withVariants } from '../utils/with-variants'

interface InputProps {
  action?: {
    icon: typeof Icon[keyof typeof Icon]
    onClick: () => void
  }
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words'
  error?: false | string
  icon?: typeof Icon[keyof typeof Icon]
  onChangeText?: (e: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  value?: string
}

/**
 * Input component.
 */

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
      minHeight: 48,
      paddingHorizontal: '$normal',
    },
    default: {},
  },
)(({ variant }, {
  action,
  autoCapitalize,
  error,
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
      position="relative"
      {...(error ? {
        borderColor: '$error',
        borderWidth: 1,
      } : {})}
    >
      {Icon && (
        <TamaguiView marginRight={8} opacity={0.3}>
          <Icon size={16} strokeWidth={3} />
        </TamaguiView>
      )}
      <TamaguiInput
        autoCapitalize={autoCapitalize}
        flex={1}
        fontFamily="$body"
        fontSize="$button"
        fontWeight="$button"
        lineHeight="$button"
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

      {error && (
        <TamaguiView bottom={-16} left={0} position="absolute">
          <Caption color="$error">
            {error}
          </Caption>
        </TamaguiView>
      )}
    </TamaguiView>
  )
})
