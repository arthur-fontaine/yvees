import * as v from '@badrap/valita'

const idPrefix = 'yvees-car-'

export type CarId = `${typeof idPrefix}${number}`

function isCarId(value: string): value is CarId {
  return (
    typeof value === 'string'
    && value.startsWith(idPrefix)
    && !Number.isNaN(Number(value.slice(idPrefix.length)))
  )
}

export const carIdSchema = v
  .string()
  .assert(isCarId)

/**
 * Converts a car ID to a number.
 * @example
 * ```ts
 * carIdToNumber('yvees-car-1') // 1
 * ```
 */
export function carIdToNumber(carId: CarId) {
  return Number(carId.slice(idPrefix.length))
}
