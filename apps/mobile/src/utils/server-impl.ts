export const serverImpls = (async () => {
    if (typeof window !== 'undefined') {
      return undefined!
    }
    
    const { visitServiceImpl } = await import('../services/visit-history-service/visit-history-service-impl')
  
    // /* eslint-disable ts/naming-convention */
    return {
      visit: visitServiceImpl,
    }
    /* eslint-enable ts/naming-convention */
  })()