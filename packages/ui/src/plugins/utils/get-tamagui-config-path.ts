import { createRequire } from 'node:module'
import path from 'node:path'
import process from 'node:process'

import packageJson from '../../../package.json'

/**
 * Get the path to the tamagui config file.
 */
export function getTamaguiConfigPath() {
  let resolve
  if (typeof __filename === 'undefined') {
    resolve = createRequire(import.meta.url).resolve
  }
  else {
    resolve = createRequire(__filename).resolve
  }

  return path.relative(
    process.cwd(),
    path.resolve(
      path.dirname(resolve(`${packageJson.name}/package.json`)),
      'src/tamagui/tamagui.config.ts',
    ),
  )
}
