import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import type { GeneratorReturn } from '../../types/generator-return'
import type { carEvent } from '../events/car-event'
import type { CarId } from '../schemas/car-id'

type CarEventsIterator = AsyncGenerator<GeneratorReturn<ReturnType<typeof carEvent['iterator']>>>

interface CarEventsContextValue {
  carEventsIterator?: CarEventsIterator | undefined
  carId: CarId | undefined
  registerCarEventsIterator: (iterator: CarEventsIterator) => void
  setCarId: (carId: string) => void
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

  const [carId, setCarId] = useState<string>()
  /* eslint-enable use-encapsulation/prefer-custom-hooks */

  return (
    <CarEventsContext.Provider value={{
      carEventsIterator,
      carId,
      registerCarEventsIterator: setCarEventsIterator,
      setCarId,
    }}
    >
      {children}
    </CarEventsContext.Provider>
  )
}

/**
 * A hook to subscribe to car events.
 */
export function useCar() {
  const context = useContext(CarEventsContext)

  if (!context) {
    console.error('useCarEvents must be used within a CarEventsProvider')
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

  const registerCar = useCallback(({ carEventsIterator, carId }: {
    carEventsIterator: CarEventsIterator
    carId: string
  }) => {
    context.setCarId(carId)
    context.registerCarEventsIterator(carEventsIterator)
  }, [context])

  return {
    carId: context.carId,
    onCarEvent,
    registerCar,
  }
}
