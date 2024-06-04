import { montserrat } from './fonts/montserrat/montserrat'
import { montserratAlternates } from './fonts/montserrat-alternates/montserrat-alternates'

/**
 * Font imports for React Native.
 */
export function getRnFonts() {
  return {
    ...montserrat,
    ...montserratAlternates,
  }
}
