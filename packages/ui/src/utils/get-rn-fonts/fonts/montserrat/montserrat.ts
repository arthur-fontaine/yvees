/* eslint-disable ts/no-require-imports */
/* eslint-disable ts/naming-convention */

if (typeof require === 'undefined') {
  // @ts-expect-error This is only to make it work in the browser
  globalThis.require = () => { }
}

export const montserrat = {
  'Montserrat-Black': require('./Montserrat-Black.ttf'),
  'Montserrat-BlackItalic': require('./Montserrat-BlackItalic.ttf'),
  'Montserrat-Bold': require('./Montserrat-Bold.ttf'),
  'Montserrat-BoldItalic': require('./Montserrat-BoldItalic.ttf'),
  'Montserrat-ExtraBold': require('./Montserrat-ExtraBold.ttf'),
  'Montserrat-ExtraBoldItalic': require('./Montserrat-ExtraBoldItalic.ttf'),
  'Montserrat-ExtraLight': require('./Montserrat-ExtraLight.ttf'),
  'Montserrat-ExtraLightItalic': require('./Montserrat-ExtraLightItalic.ttf'),
  'Montserrat-Italic': require('./Montserrat-Italic.ttf'),
  'Montserrat-Light': require('./Montserrat-Light.ttf'),
  'Montserrat-LightItalic': require('./Montserrat-LightItalic.ttf'),
  'Montserrat-Medium': require('./Montserrat-Medium.ttf'),
  'Montserrat-MediumItalic': require('./Montserrat-MediumItalic.ttf'),
  'Montserrat-Regular': require('./Montserrat-Regular.ttf'),
  'Montserrat-SemiBold': require('./Montserrat-SemiBold.ttf'),
  'Montserrat-SemiBoldItalic': require('./Montserrat-SemiBoldItalic.ttf'),
  'Montserrat-Thin': require('./Montserrat-Thin.ttf'),
  'Montserrat-ThinItalic': require('./Montserrat-ThinItalic.ttf'),
}
