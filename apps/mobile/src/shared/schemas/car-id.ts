import * as v from '@badrap/valita'

export type CarId = `yvees-car-${number}`

function isCarId(value: string): value is CarId {
  return (
    typeof value === 'string' &&
    value.startsWith('yvees-car-') &&
    !Number.isNaN(Number(value.slice('yvees-car-'.length)))
  )
}

export const carIdSchema = v
  .string()
  .assert(isCarId)
