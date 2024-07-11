import React from 'react'
import type { RefObject } from 'react'
import { Input as TamaguiInput, View as TamaguiView } from 'tamagui'

import { Caption } from './typographies/caption'

interface OtpInputProps {
  codes: string[]
  error?: false | string
  onChangeCode: (text: string, index: number) => void
  refs: RefObject<TamaguiInput>[]
}

/**
 * Input component.
 */
// ...
export function OtpInput({
  codes,
  error,
  onChangeCode,
  refs,
}: OtpInputProps) {
  return (
    <TamaguiView
      display="flex"
      flexDirection="row"
      gap={8}
      position="relative"
      width="100%"
    >
      {codes.map((code, index) => (
        <TamaguiInput
          autoComplete="one-time-code"
          backgroundColor="#EDEDED"
          enterKeyHint="next"
          flexGrow={1}
          height={80}
          inputMode="numeric"
          key={index}
          onChangeText={(text: string) => onChangeCode(text, index)}
          onKeyPress={({ nativeEvent: { key } }) => {
            if (key === 'Backspace' && index > 0 && codes[index] === '') {
              refs[index - 1]?.current?.focus()
            }
          }}
          ref={refs[index]}
          value={code}
          {...(error ? {
            borderColor: '$error',
            borderWidth: 1,
          } : {})}
        />
      ))}
      {error && (
        <TamaguiView bottom={-16} left={0} position="absolute">
          <Caption color="$error">
            {error}
          </Caption>
        </TamaguiView>
      )}
    </TamaguiView>
  )
}
