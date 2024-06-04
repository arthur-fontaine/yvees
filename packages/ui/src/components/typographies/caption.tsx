import React from 'react'
import { Paragraph as TamaguiParagraph } from 'tamagui'

interface BodyProps {
  children?: string
  color?: string
}

/**
 * Caption component.
 */
export function Caption({ children, color }: BodyProps) {
  return (
    <TamaguiParagraph
      color={color || '$defaultBodyTextColor'}
      fontFamily="$body"
      fontSize="$caption"
      fontWeight="$caption"
      lineHeight="$caption"
    >
      {children}
    </TamaguiParagraph>
  )
}
