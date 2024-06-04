/* eslint-disable ts/no-require-imports */
/* eslint-disable ts/naming-convention */

if (typeof require === 'undefined') {
  // @ts-expect-error This is only to make it work in the browser
  globalThis.require = () => { }
}

export const montserratAlternates = {
  'MontserratAlternates-Black': require('./MontserratAlternates-Black.ttf'),
  'MontserratAlternates-BlackItalic': require('./MontserratAlternates-BlackItalic.ttf'),
  'MontserratAlternates-Bold': require('./MontserratAlternates-Bold.ttf'),
  'MontserratAlternates-BoldItalic': require('./MontserratAlternates-BoldItalic.ttf'),
  'MontserratAlternates-ExtraBold': require('./MontserratAlternates-ExtraBold.ttf'),
  'MontserratAlternates-ExtraBoldItalic': require('./MontserratAlternates-ExtraBoldItalic.ttf'),
  'MontserratAlternates-ExtraLight': require('./MontserratAlternates-ExtraLight.ttf'),
  'MontserratAlternates-ExtraLightItalic': require('./MontserratAlternates-ExtraLightItalic.ttf'),
  'MontserratAlternates-Italic': require('./MontserratAlternates-Italic.ttf'),
  'MontserratAlternates-Light': require('./MontserratAlternates-Light.ttf'),
  'MontserratAlternates-LightItalic': require('./MontserratAlternates-LightItalic.ttf'),
  'MontserratAlternates-Medium': require('./MontserratAlternates-Medium.ttf'),
  'MontserratAlternates-MediumItalic': require('./MontserratAlternates-MediumItalic.ttf'),
  'MontserratAlternates-Regular': require('./MontserratAlternates-Regular.ttf'),
  'MontserratAlternates-SemiBold': require('./MontserratAlternates-SemiBold.ttf'),
  'MontserratAlternates-SemiBoldItalic': require('./MontserratAlternates-SemiBoldItalic.ttf'),
  'MontserratAlternates-Thin': require('./MontserratAlternates-Thin.ttf'),
  'MontserratAlternates-ThinItalic': require('./MontserratAlternates-ThinItalic.ttf'),
}
