import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import tmp from 'tmp-promise'

const dirname = __dirname

/* eslint-disable ts/consistent-type-definitions */
/* eslint-disable ts/naming-convention */
type BuildBootParams = {
  IP_CAR_3_REPLACE: number
  IP_CAR_4_REPLACE: number
  IP_GATEWAY_1_REPLACE: number
  IP_GATEWAY_2_REPLACE: number
  IP_GATEWAY_3_REPLACE: number
  IP_GATEWAY_4_REPLACE: number
  IP_MQTT_1_REPLACE: number
  IP_MQTT_2_REPLACE: number
  IP_MQTT_3_REPLACE: number
  IP_MQTT_4_REPLACE: number
  PASSWORD_WIFI_REPLACE: string
  SSID_WIFI_REPLACE: string
  SUBNET_1_REPLACE: number
  SUBNET_2_REPLACE: number
  SUBNET_3_REPLACE: number
  SUBNET_4_REPLACE: number
}
/* eslint-enable ts/naming-convention */
/* eslint-enable ts/consistent-type-definitions */

/* eslint-disable ts/consistent-type-definitions */
type BootBuilt = {
  bootloader: number[]
  firmware: number[]
  partitionTable: number[]
}
/* eslint-enable ts/consistent-type-definitions */

/**
 * Build the boot.
 */
export async function buildBoot(params: BuildBootParams): Promise<BootBuilt> {
  const bootSrc = path.join(dirname, '..', 'boot')
  const bootTmpSrc = await tmp.dir({ unsafeCleanup: true })

  await fs.promises.cp(bootSrc, bootTmpSrc.path, { recursive: true })

  const mainCppPath = path.join(bootTmpSrc.path, 'src', 'main.cpp')
  const mainCpp = await fs.promises.readFile(mainCppPath, 'utf-8')

  let mainCppReplaced = mainCpp
  for (const [key, value] of Object.entries(params)) {
    mainCppReplaced = mainCppReplaced.replace(
      new RegExp(key, 'g'),
      value.toString(),
    )
  }

  await fs.promises.writeFile(mainCppPath, mainCppReplaced)

  execSync('pio run', { cwd: bootTmpSrc.path })

  const filesToRead = ['bootloader', 'firmware', 'partitions'] as const
  const files = {} as Record<typeof filesToRead[number], number[]>
  await Promise.all(
    filesToRead.map(async (file) => {
      const filePath = path.join(
        bootTmpSrc.path,
        '.pio',
        'build',
        'esp-wrover-kit',
        `${file}.bin`,
      )
      const fileBuffer = await fs.promises.readFile(filePath)
      files[file] = Array.from(fileBuffer)
    }),
  )

  await bootTmpSrc.cleanup()

  return {
    bootloader: files.bootloader,
    firmware: files.firmware,
    partitionTable: files.partitions,
  }
}
