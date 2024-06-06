import { useFonts } from 'expo-font'
import { useMemo } from 'react'
import { getRnFonts } from 'ui'

/**
 * This hook is used to check if everything is loaded before rendering the app.
 */
export function useInitialLoading() {
  const [fontsLoaded] = useFonts(getRnFonts())

  const loaded = useMemo(() => fontsLoaded, [fontsLoaded])

  return { loaded }
}
