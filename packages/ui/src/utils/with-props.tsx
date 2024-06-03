import type { FunctionComponent } from 'react'
import React from 'react'

/**
 * Higher-order component that adds props to a component.
 */
export function withProps<P>(
  // eslint-disable-next-line ts/naming-convention
  Component: FunctionComponent<P>,
  props: Partial<P>,
): FunctionComponent<Omit<P, keyof typeof props> & Partial<typeof props>> {
  // @ts-expect-error `props` and `props_` are assignable to component props
  return props_ => <Component {...props_} {...props} />
}
