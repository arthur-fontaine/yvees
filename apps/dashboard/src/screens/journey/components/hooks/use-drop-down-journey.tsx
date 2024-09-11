import type { Journey } from 'db'
import { useEffect, useState } from 'react'

/**
 *  Hook to manage the dropdown journey.
 */
export function useDropDownJourney(journey: Journey) {
  const [checkAutomatic, setCheckAutomatic] = useState(false)
  const [checkManual, setCheckManual] = useState(false)

  useEffect(() => {
    if (journey.controlMode === 'automatic') {
      setCheckAutomatic(true)
      setCheckManual(false)
    }
 else {
      setCheckAutomatic(false)
      setCheckManual(true)
    }
  }, [journey.controlMode])

  return { checkAutomatic, checkManual, setCheckAutomatic, setCheckManual }
}
