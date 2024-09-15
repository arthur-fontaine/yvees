export const serverImpls = (async () => {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return undefined!
  }

  const { carServiceImpl } = await import('../services/car-service/car-service-impl')
  const { joinSessionServiceImpl } = await import('../services/join-session-service/join-session-service-impl')
  const { userServiceImpl } = await import('../../services/user-service/user-service-impl')
  const { visitServiceImpl } = await import('../../services/visit-history-service/visit-history-service-impl')

  /* eslint-disable ts/naming-convention */
  return {
    CarService: carServiceImpl,
    JoinSessionService: await joinSessionServiceImpl(),
    user: userServiceImpl,
    visit: visitServiceImpl,
  }
})()
