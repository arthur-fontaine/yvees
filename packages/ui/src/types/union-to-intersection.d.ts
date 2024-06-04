export type UnionToIntersection<U> =
  // eslint-disable-next-line ts/no-explicit-any
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never
