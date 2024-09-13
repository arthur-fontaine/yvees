export type GeneratorReturn<T> =
  // eslint-disable-next-line ts/no-explicit-any
  T extends Generator<infer R, any, any> ? R
  // eslint-disable-next-line ts/no-explicit-any
  : T extends AsyncGenerator<infer R, any, any> ? R
  : never
