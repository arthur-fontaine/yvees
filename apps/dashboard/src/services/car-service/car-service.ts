import * as DI from 'diabolo'

export interface CarService extends DI.Service<'car', {
  assignCarToJourney: (
    params: { carId: number, journeyId: number },
  ) => Promise<void>

  findCarAssignedToJourney: (
    params: { journeyId: number },
  ) => Promise<{
    id: number
    name: string
  } | undefined>

  findCarsAvailableForAffiliation: (
    params: { clerkOrganizationId: string },
  ) => Promise<{
    id: number
    name: string
  }[]>
}> { }

export const carService = DI.createService<CarService>('car')
