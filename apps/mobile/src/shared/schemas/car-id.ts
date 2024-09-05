import * as v from '@badrap/valita'

const idPrefix = 'yvees-car-'

export type CarId = `${typeof idPrefix}${number}`

function isCarId(value: string): value is CarId {
  return (
    typeof value === 'string' &&
    value.startsWith(idPrefix) &&
    !Number.isNaN(Number(value.slice(idPrefix.length)))
  )
}

export const carIdSchema = v
  .string()
  .assert(isCarId)

export const carIdToNumber = (carId: CarId) => Number(carId.slice(idPrefix.length))
