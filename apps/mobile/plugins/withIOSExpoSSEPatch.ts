/* eslint-disable */

import { withDangerousMod } from '@expo/config-plugins'
import assert from 'assert'
import fs from 'fs'
import path from 'path'

import { directoryExistsAsync, getFileInfo, replaceContentsWithOffset } from './utils'

const PATCH_TAG = '[SSE_IOS_PATCH]'

type ExpoConfig = Parameters<typeof withDangerousMod>[0]

/**
 * Prevents expo's CdpInterceptor from breaking on streams
 *
 * Essentially applies in {projectRoot}/node_modules/expo-modules-core/ios/DevTools/ExpoRequestCdpInterceptor.swift
 * ```diff
 * - if !responseBodyExceedsLimit {
 * + if !responseBodyExceedsLimit && response.value(forHTTPHeaderField: "Content-Type")?.hasPrefix("text/event-stream") == false {
 * ```
 *
 * @param config
 */
export function withIOSExpoSSEPatch(config: ExpoConfig) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      // {projectRoot}/node_modules/expo-modules-core/ios/DevTools/ExpoRequestCdpInterceptor.swift
      const projectRoot = config.modRequest.projectRoot
      const expoModuleCorePath = path.join(projectRoot, 'node_modules', 'expo-modules-core')
      const expoModuleCoreExists = await directoryExistsAsync(expoModuleCorePath)
      if (!expoModuleCoreExists) {
        // skip if dir doesn't exist
        return config
      }

      const interceptorPath = path.join(
        expoModuleCorePath,
        'ios/DevTools/ExpoRequestCdpInterceptor.swift',
      )
      assert(
        interceptorPath,
        `SSE_PATCH_ERR: ExpoNetworkInspectOkHttpInterceptors not found at ios/DevTools/ExpoRequestCdpInterceptor.swift`,
      )
      const interceptor = getFileInfo(interceptorPath)

      const hasPatch = interceptor.contents.indexOf(PATCH_TAG) >= 0
      if (hasPatch) {
        return config
      }

      const breakStr = 'if !responseBodyExceedsLimit {'
      const start = interceptor.contents.indexOf(breakStr)
      if (start < 0) {
        throw new Error('SSE_PATCH_ERR: Could not find interceptor break condition')
      }

      interceptor.contents = replaceContentsWithOffset(
        interceptor.contents,
        `
    // ${PATCH_TAG}: Ignore text/event-stream types of responses
    // !responseBodyExceedsLimit breaks for streams.
    // Check in addition if the response is not of type text/event-stream. Get the content type from the response headers (default to empty string).
    if !responseBodyExceedsLimit && (response.value(forHTTPHeaderField: "Content-Type")?.hasPrefix("text/event-stream") ?? false) == false {`,
        start,
        start + breakStr.length,
      )

      // console.log('interceptorContents', interceptor.contents)

      fs.writeFileSync(interceptor.path, interceptor.contents)
      return config
    },
  ])
}