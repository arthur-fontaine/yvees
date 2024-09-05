import * as DI from 'diabolo'

export interface CarService extends DI.Service<
  'CarService',
  {
    getCarInfos: (carId: number) => Promise<{
      ip: string
    }>
  }
> { }

export const CarService = DI.createService<CarService>('CarService')
