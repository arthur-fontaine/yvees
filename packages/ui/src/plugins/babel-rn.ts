import { getTamaguiConfigPath } from './utils/get-tamagui-config-path'

// @ts-expect-error Using dot notation works
// eslint-disable-next-line node/prefer-global/process
process.env.TAMAGUI_TARGET = 'native'

/**
 * The UI plugin for Babel.
 */
export function ui(env: 'native' | 'web') {
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
        config: getTamaguiConfigPath(env),
        logTimings: true,
      },
    ],
  ]
}
