import { getTamaguiConfigPath } from './utils/get-tamagui-config-path'

// eslint-disable-next-line node/prefer-global/process
process.env.TAMAGUI_TARGET = 'native'

/**
 * The UI plugin for Babel.
 */
export function ui() {
  return [
    [
      'transform-inline-environment-variables',
      {
        include: ['TAMAGUI_TARGET'],
      },
    ],
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui', 'ui/components', 'ui/theme'],
        config: getTamaguiConfigPath(),
        logTimings: true,
      },
    ],
  ]
}
