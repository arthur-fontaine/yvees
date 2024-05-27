import type React from 'react'

export type Props<T extends React.ElementType> =
  Omit<
    React.ComponentProps<T>,
    'unstyled'
  >
