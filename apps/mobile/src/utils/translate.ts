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
  _Translationobject extends Record<string, unknown> = Translations['en'],
  _Prefix extends string = '',
> = {
  [Key in keyof _TranslationObject]: Key extends number | string ?
    _TranslationObject[Key] extends Record<string, unknown> ?
      TranslationKeys<_TranslationObject[Key], `${_Prefix}${Key}.`>
      : `${_Prefix}${Key}`
    : never;
}[keyof _TranslationObject]

type TranslationValue<
  Key extends TranslationKeys,
  _Key extends string = Key,
  _TranslationObject extends Record<string, any> = Translations['en'],
> = _Key extends `${infer Prefix}.${infer Rest}` ?
  TranslationValue<Key, Rest, _TranslationObject[Prefix]>
  : _Key extends keyof _TranslationObject ? _TranslationObject[_Key]
  : never
