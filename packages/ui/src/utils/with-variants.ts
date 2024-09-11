import type React from 'react'
import { forwardRef } from 'react'

/**
 * Higher-order component that adds variant support to a component.
 */
export function withVariants<
  VariantNames extends string,
  Variant,
>(
  variants: { $defaults?: Variant } & Record<VariantNames, Variant>,
) {
  return function <Props, Ref>(
    component: (
      variantProps: { variant: Variant, variantName: VariantNames },
      props: Props,
      ref?: React.ForwardedRef<Ref>,
    ) => React.ReactElement,
  ) {
    return forwardRef<Ref, { variant: VariantNames } & Props>((props, ref) => {
      const variant = { ...variants.$defaults, ...variants[props.variant] }
      return component(
        { variant, variantName: props.variant },
        props as Props,
        ref,
      )
    })
  }
}
