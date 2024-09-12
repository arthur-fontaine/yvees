import type { Journey, Museum, Visit } from 'db'

export type VisitWithJourneyAndMuseum = {
    journey: {
      museum: Museum
    } & Journey
} & Visit
