import { useCallback } from 'react'

import { translate } from '../../utils/translate'

/**
 *  Translates a key to the current language.
 */
export function useTranslate() {
  // TODO : Add Select lang or check lang of the mobile user

  return useCallback(
    <K extends Parameters<typeof translate>[0]>(key: K) => translate<K>(key, 'fr'),
    ['fr'],
  )
}
