import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'

import type { GeneratorReturn } from '../../types/generator-return'
import type { carEvent } from '../events/car-event'
import type { JourneyId } from '../schemas/journey-id'
import { carService } from '../services/car-service/car-service'
import { serverImpls } from '../utils/server-impls'

type CarEventsIterator = AsyncGenerator<GeneratorReturn<ReturnType<typeof carEvent['iterator']>>>

interface CarEventsContextValue {
  carEventsIterator?: CarEventsIterator | undefined
  journeyId: JourneyId | undefined
  registerCarEventsIterator: (iterator: CarEventsIterator) => void
  setJourneyId: (journeyId: JourneyId) => void
}

// eslint-disable-next-line ts/naming-convention
const CarEventsContext
  = createContext<CarEventsContextValue>(undefined as never)

/**
 * A provider to provide car events.
 */
export function CarEventsProvider({ children }: React.PropsWithChildren) {
  /* eslint-disable use-encapsulation/prefer-custom-hooks */
  const [carEventsIterator, setCarEventsIterator]
    = useState<CarEventsIterator>()

  const [journeyId, setJourneyId] = useState<JourneyId>()
  /* eslint-enable use-encapsulation/prefer-custom-hooks */

  return (
      <CarEventsContext.Provider value={{
      carEventsIterator,
      journeyId,
      registerCarEventsIterator: setCarEventsIterator,
      setJourneyId,
    }}
      >
          {children}
      </CarEventsContext.Provider>
  )
}

const getCarInfos = createRoute(DI.provide(function* (
  { journeyId }: { journeyId: JourneyId },
) {
  const { getCarInfos } = yield * DI.requireService(carService)
  return getCarInfos({ journeyId })
}, serverImpls), { path: '/get-car-infos' })

/**
 * A hook to subscribe to car events.
 */
export function useCar() {
  const context = useContext(CarEventsContext)

  if (!context) {
    console.error('useCar must be used within a CarEventsProvider')
  }

  type Listener = (event: GeneratorReturn<ReturnType<typeof carEvent['iterator']>>) => void

  const listeners = useRef<Listener[]>([])

  const onCarEvent = useCallback((cb: Listener) => {
    listeners.current.push(cb)
    return () => {
      listeners.current = listeners.current.filter(listener => listener !== cb)
    }
  }, [])

  const runListeners = useCallback(async () => {
    if (!context.carEventsIterator) {
      return
    }

    for await (const event of context.carEventsIterator) {
      listeners.current.forEach(listener => listener(event))
    }
  }, [context.carEventsIterator])

  useEffect(() => {
    runListeners()
  }, [runListeners])

  const registerCar = useCallback(({ carEventsIterator, journeyId }: {
    carEventsIterator: CarEventsIterator
    journeyId: JourneyId
  }) => {
    context.setJourneyId(journeyId)
    context.registerCarEventsIterator(carEventsIterator)
  }, [context])

  const { data: carInfos } = useQuery(
    ['carInfos', context.journeyId],
    () => getCarInfos({ journeyId: context.journeyId! }),
    {
      enabled: context.journeyId !== undefined,
    },
  )

  return {
    carInfos,
    journeyId: context.journeyId,
    onCarEvent,
    registerCar,
  }
}
