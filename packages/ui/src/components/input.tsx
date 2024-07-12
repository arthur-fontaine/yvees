import React, { useCallback } from 'react'
import type { GetProps } from 'tamagui'
import { Input as TamaguiInput, View as TamaguiView } from 'tamagui'

import { Button } from './button'
import type { Icon } from './icon/icon'
import { Caption } from './typographies/caption'
import { withVariants } from '../utils/with-variants'

interface InputProps {
  action?: {
    icon: typeof Icon[keyof typeof Icon]
    onClick: GetProps<typeof Button>['onClick']
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
  'default' | 'outlined',
  GetProps<typeof TamaguiView>
>(
  {
    $defaults: {
      alignItems: 'center',
      borderWidth: 0,
      display: 'flex',
      flexDirection: 'row',
      minHeight: 48,
      paddingHorizontal: '$normal',
    },
    default: {
      backgroundColor: '#EDEDED',
      borderRadius: '$mediumSizedElement',
    },
    outlined: {
      borderColor: '#EDEDED',
      borderRadius: '$smallSiezdElement',
      borderWidth: 1,
    },
  },
)(({ variant, variantName }, {
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
  const onActionClick = useCallback((event: Parameters<NonNullable<GetProps<typeof Button>['onClick']>>[0]) => {
    event.preventDefault()
    action?.onClick?.(event)
  }, [action])

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
        placeholderTextColor="#9B9B9B"
        secureTextEntry={secureTextEntry}
        unstyled
      >
        {value}
      </TamaguiInput>
      {action && (
        <Button
          icon={action?.icon}
          onClick={onActionClick}
          variant={variantName === 'outlined' ? 'empty' : 'secondary'}
        />
      )}
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
