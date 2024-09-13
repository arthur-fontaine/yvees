import { useClerk } from '@clerk/clerk-react'
import { createRoute } from 'agrume'
import { buildBoot } from 'car'
import * as DI from 'diabolo'
import { EspLoader } from 'esptool.ts'
import { useEffect } from 'react'

import { museumService } from '../../../../../services/museum-service/museum-service'
import { toast } from '../../../../../shared/components/ui/use-toast'
import { useAsyncCallback } from '../../../../../shared/hooks/use-async-callback'
import { serverImpls } from '../../../../../utils/server-impls'

const getProgramBins = createRoute(DI.provide(async function* (
  { clerkOrganizationId, ...params }:
    { clerkOrganizationId: string } & Omit<Parameters<typeof buildBoot>[0], 'IP_CAR_4_REPLACE'>,
) {
  const { findMuseumOfClerkOrg, getCarsOfMuseum, insertNewCarOfMuseum }
    = yield * DI.requireService(museumService)
  const museum = await findMuseumOfClerkOrg({ clerkOrganizationId })

  if (museum === undefined) {
    // eslint-disable-next-line fp/no-throw
    throw new Error('No museum found')
  }

  const registedCars = await getCarsOfMuseum({ museumId: museum.id })
  const alreadyTakenIps = registedCars.map(car => car.ip)

  const baseIp = `192.168.${params.IP_CAR_3_REPLACE}.`
  const findIp = (ip: string, remainingTry = 100): string | undefined => {
    if (remainingTry === 0) {
      return undefined
    }

    const lastPart = (getIpParts(ip, false)[3] ?? 91) + 1

    const newIp = baseIp + lastPart

    if (alreadyTakenIps.includes(newIp)) {
      return findIp(newIp, remainingTry - 1)
    }

    return newIp
  }

  const carIp = findIp(`${baseIp}91`)
  if (carIp === undefined) {
    // eslint-disable-next-line fp/no-throw
    throw new Error('No available IP')
  }

  const ipCar4 = getIpParts(carIp, true)[3]

  await insertNewCarOfMuseum({ ip: carIp, museumId: museum.id })

  return buildBoot({
    ...params,
    // eslint-disable-next-line ts/naming-convention
    IP_CAR_4_REPLACE: ipCar4,
  })
}, serverImpls))

const logger = console

/**
 * A hook to boot the car.
 */
export function useBootCar() {
  const session = useClerk()
  const clerkOrganizationId
    = session.user?.organizationMemberships[0]?.organization.id

  const {
    error,
    fn: bootCar_,
    loading,
  } = useAsyncCallback(async (params: Omit<Parameters<typeof bootCar>[1], 'clerkOrganizationId'>) => {
    if (clerkOrganizationId === undefined) {
      return
    }

    const espLoader = await getEspLoader()
    await bootCar(espLoader, { ...params, clerkOrganizationId })
  }, [clerkOrganizationId])

  useEffect(() => {
    if (error) {
      toast({
        description: error.message,
        duration: 3500,
      })
    }
  }, [error])

  return { bootCar: bootCar_, error, loading }
}

async function bootCar(espLoader: EspLoader, params: {
  clerkOrganizationId: string
  gatewayIp: string
  mqttIp: string
  subnet: string
  wifiPassword: string
  wifiSsid: string
}) {
  logger.log('Booting ESP32')

  logger.log('Getting program bins')

  const [ipGateway1, ipGateway2, ipGateway3, ipGateway4]
    = getIpParts(params.gatewayIp, true)
  const [subnet1, subnet2, subnet3, subnet4]
    = getIpParts(params.subnet, true)
  const [mqttIp1, mqttIp2, mqttIp3, mqttIp4]
    = getIpParts(params.mqttIp, true)

  const { bootloader, firmware, partitionTable } = await getProgramBins({
    /* eslint-disable ts/naming-convention */
    IP_CAR_3_REPLACE: ipGateway3,
    IP_GATEWAY_1_REPLACE: ipGateway1,
    IP_GATEWAY_2_REPLACE: ipGateway2,
    IP_GATEWAY_3_REPLACE: ipGateway3,
    IP_GATEWAY_4_REPLACE: ipGateway4,
    IP_MQTT_1_REPLACE: mqttIp1,
    IP_MQTT_2_REPLACE: mqttIp2,
    IP_MQTT_3_REPLACE: mqttIp3,
    IP_MQTT_4_REPLACE: mqttIp4,
    PASSWORD_WIFI_REPLACE: params.wifiPassword,
    SSID_WIFI_REPLACE: params.wifiSsid,
    SUBNET_1_REPLACE: subnet1,
    SUBNET_2_REPLACE: subnet2,
    SUBNET_3_REPLACE: subnet3,
    SUBNET_4_REPLACE: subnet4,
    /* eslint-enable ts/naming-convention */
    clerkOrganizationId: params.clerkOrganizationId,
  })
  logger.log('Got program bins')

  const partitions: {
    address: number
    data: Uint8Array
  }[] = [
    {
      address: 0x1000,
      data: new Uint8Array(bootloader),
    },
    {
      address: 0x8000,
      data: new Uint8Array(partitionTable),
    },
    {
      address: 0x10000,
      data: new Uint8Array(firmware),
    },
  ]

  logger.log('Connecting to ESP32')
  await espLoader.connect()
  logger.log('Connected to ESP32')

  await espLoader.loadStub()

  logger.log('Erasing flash')
  await espLoader.eraseFlash(30000)
  logger.log('Flash erased')
  logger.log('Flashing data')
  for (let i = 0; i < partitions.length; i++) {
    const partition = partitions[i]
    if (partition === undefined) {
      continue
    }
    logger.log(`Flashing partition ${i + 1}/${partitions.length}`)
    await espLoader.flashData(partition.data, partition.address)
    logger.log(`Partition ${i + 1}/${partitions.length} flashed`)
  }
  logger.log('Data flashed')
  logger.log('Disconnecting from ESP32')
  await espLoader.disconnect()
  logger.log('Disconnected from ESP32')
}

/**
 * Get the ESP loader.
 */
export async function getEspLoader() {
  const device = await navigator.serial.requestPort({ filters: [] })
  await device.open({ baudRate: 115200 })

  return new EspLoader(device, { logger: console })
}

// /**
//  * Get the program bins.
//  */
// async function getProgramBins() {
//   const bootloaderResponse = await fetch('/bootloader.bin')
//   const bootloaderBin = new Uint8Array(await bootloaderResponse.arrayBuffer())

//   const partitionTableResponse = await fetch('/partitions.bin')
//   const partitionTableBin
//     = new Uint8Array(await partitionTableResponse.arrayBuffer())

//   const firmwareResponse = await fetch('/firmware.bin')
//   const firmwareBin = new Uint8Array(await firmwareResponse.arrayBuffer())

//   return { bootloaderBin, firmwareBin, partitionTableBin }
// }

/**
 * Get the ESP32 infos.
 */
export async function getInfos() {
  const espLoader = await getEspLoader()
  await espLoader.connect()

  try {
    return {
      chipName: await espLoader.chipName(),
      macAddr: await espLoader.macAddr(),
    }
  }
  finally {
    await espLoader.disconnect()
    // eslint-disable-next-line no-unsafe-finally
    return {}
  }
}

function getIpParts<T extends boolean>(
  ip: string,
  throwError: T,
): T extends true ? [number, number, number, number] : number[] {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some(part => Number.isNaN(part))) {
    if (throwError) {
      // eslint-disable-next-line fp/no-throw
      throw new Error('Invalid IP')
    }
    return [] as never
  }
  return parts as [number, number, number, number]
}
