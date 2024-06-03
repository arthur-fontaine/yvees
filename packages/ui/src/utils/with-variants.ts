import type React from 'react'

/**
 * Higher-order component that adds variant support to a component.
 */
export function withVariants<
  VariantNames extends string,
  Variant,
>(
  variants: { $defaults?: Variant } & Record<VariantNames, Variant>,
) {
  return function <Props>(
    component: (
      variantProps: { variant: Variant, variantName: VariantNames },
      props: Props,
    ) => React.ReactElement,
  ) {
    return (props: { variant: VariantNames } & Props) => {
      const variant = { ...variants.$defaults, ...variants[props.variant] }
      return component({ variant, variantName: props.variant }, props)
    }
  }
}
