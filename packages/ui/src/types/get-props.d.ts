import type React from 'react'

export type GetProps<T extends React.ElementType> =
  Omit<
    React.ComponentProps<T>,
    'unstyled'
  >
