import React from 'react'
import type { RefObject } from 'react'
import { Input as TamaguiInput, View as TamaguiView } from 'tamagui'

interface OtpInputProps {
  codes: string[]
  errorMessages: string[] | undefined
  onChangeCode: (text: string, index: number) => void
  refs: RefObject<TamaguiInput>[]
}

/**
 * Input component.
 */
// ...
export function OtpInput({
  codes,
  onChangeCode,
  refs,
}: OtpInputProps) {
    return (
      <TamaguiView display="flex" flexDirection="row" gap={8} width="100%">
        {codes.map((code, index) => (
          <TamaguiInput
            autoComplete="one-time-code"
            backgroundColor="#EDEDED"
            borderColor="#EDEDED"
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
          />
      ))}
      </TamaguiView>
    )
}