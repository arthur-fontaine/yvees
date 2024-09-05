export const serverImpls = (async () => {
  if (typeof window !== 'undefined') {
    return undefined!
  }

  const { journeyServiceImpl } = await import('../services/journey-service/journey-service-impl')
  const { museumServiceImpl } = await import('../services/museum-service/museum-service-impl')

  // /* eslint-disable ts/naming-convention */
  return {
    journey: journeyServiceImpl,
    museum: museumServiceImpl,
  }
})()
