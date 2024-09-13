import type { Journey } from 'db'
import { useCallback, useEffect, useState } from 'react'

/**
 *  Hook to manage the dropdown journey.
 */
export function useJourneyModeSelector(journey: Pick<Journey, 'controlMode'>) {
  const [mode, setMode] = useState<'automatic' | 'manual'>(journey.controlMode)

  useEffect(() => {
    setMode(journey.controlMode)
  }, [journey.controlMode])

  return {
    mode,
    setMode: useCallback(
      (newMode: 'automatic' | 'manual') => setMode(newMode),
      [],
    ),
  }
}
