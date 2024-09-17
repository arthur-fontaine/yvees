import * as v from '@badrap/valita'

const idPrefix = 'yvees-journey-'

export type JourneyId = `${typeof idPrefix}${number}`

function isJourneyId(value: string): value is JourneyId {
  return (
    typeof value === 'string'
    && value.startsWith(idPrefix)
    && !Number.isNaN(Number(value.slice(idPrefix.length)))
  )
}

export const journeyIdSchema = v
  .string()
  .assert(isJourneyId)

/**
 * Converts a journey ID to a number.
 * @example
 * ```ts
 * journeyIdToNumber('yvees-journey-1') // 1
 * ```
 */
export function journeyIdToNumber(journeyId: JourneyId) {
  return Number(journeyId.slice(idPrefix.length))
}
