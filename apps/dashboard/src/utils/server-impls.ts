export const serverImpls = (async () => {
  if (typeof window !== 'undefined') {
    return undefined!
  }

  const { journeyServiceImpl } = await import('../services/journey-service/journey-service-impl')
  const { museumServiceImpl } = await import('../services/museum-service/museum-service-impl')
  const { journeyStepServiceImpl } = await import('../services/journey-step-service/journey-step-service-impl')

  // /* eslint-disable ts/naming-convention */
  return {
    journey: journeyServiceImpl,
    journeyStep: journeyStepServiceImpl,
    museum: museumServiceImpl,
  }
})()
