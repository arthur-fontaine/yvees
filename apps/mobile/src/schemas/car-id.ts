import * as v from '@badrap/valita'

export type CarId = `yvees-car-${string}`

function isCarId(value: string): value is CarId {
  return typeof value === 'string' && value.startsWith('yvees-car-')
}

export const carIdSchema = v
  .string()
  .assert(isCarId)
