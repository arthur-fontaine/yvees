import * as Localization from 'expo-localization'
import { useCallback, useEffect, useState } from 'react'

import type { Language } from '../../translations/translations-type'
import { translate } from '../../utils/translate'

const allowedLanguages: Language[] = ['en', 'es', 'fr']

/**
 *  Translates a key to the current language.
 */
export function useTranslate() {
  const [language, setLanguage] = useState<Language>('en') // default to 'en'

  useEffect(() => {
    const locales = Localization.getLocales()

    if (locales.length > 0) {
      const locale = locales[0]?.languageCode as string | undefined

      if (locale && allowedLanguages.includes(locale as Language)) {
        setLanguage(locale as Language)
      }
    }
  }, [])

  return useCallback(
    <K extends Parameters<typeof translate>[0]>(key: K) =>
      translate<K>(key, language),
    [language],
  )
}
