import React from 'react'
import { View as TamaguiView } from 'tamagui'

interface SeparatorProps {
    color?: string
}

/**
 * Separator component.
 */
export function Separator({ color }: SeparatorProps) {
  return (
    <TamaguiView backgroundColor={color || '$defaultSeparatorColor'} flex={1} height={1} />
  )
}
