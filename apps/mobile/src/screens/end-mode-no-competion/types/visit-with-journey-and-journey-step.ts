import type { Journey, JourneyStep, Visit } from 'db'

export type VisitWithJourneyAndJourneyStep = {
  journey: {
    journeyStep: JourneyStep[]
  } & Journey
} & Visit
