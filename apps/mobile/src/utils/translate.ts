/* eslint-disable ts/no-explicit-any */

import { I18n } from 'i18n-js'

import { translations } from '../translations/translations'
import type { Translations } from '../translations/translations-type'

const i18n = new I18n(translations, {
  enableFallback: true,
})

/**
 *  Translates a key to the current language.
 */
export function translate<K extends TranslationKeys>(
  key: K,
  language?: string,
): TranslationValue<K> {
  if (language !== undefined) {
    i18n.locale = language
  }

  return i18n.t<TranslationValue<K> | string>(key) as any
}

type TranslationKeys<
  /* eslint-disable ts/naming-convention */
  // eslint-disable-next-line style/max-len
  _TranslationObject extends Record<string, unknown> = Translations[keyof Translations],
  _Prefix extends string = '',
/* eslint-enable ts/naming-convention */
> = {
  [Key in keyof _TranslationObject]: Key extends number | string ?
    _TranslationObject[Key] extends Record<string, unknown> ?
      TranslationKeys<_TranslationObject[Key], `${_Prefix}${Key}.`>
      : `${_Prefix}${Key}`
    : never;
}[keyof _TranslationObject]

type TranslationValue<
  Key extends TranslationKeys,
  /* eslint-disable ts/naming-convention */
  _Key extends string = Key,
  // eslint-disable-next-line style/max-len
  _TranslationObject extends Record<string, any> = Translations[keyof Translations],
/* eslint-enable ts/naming-convention */
> = _Key extends `${infer Prefix}.${infer Rest}` ?
  TranslationValue<Key, Rest, _TranslationObject[Prefix]>
  : _Key extends keyof _TranslationObject ? _TranslationObject[_Key]
  : never
