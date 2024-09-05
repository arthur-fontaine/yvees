export interface JourneyStepSerialized {
  createdAt: string
  description: null | string
  end: boolean
  id: number
  journeyId: number
  name: string
  start: boolean
  updatedAt: string
}

export interface JourneySerialized {
  averageVisitDuration: number
  createdAt: string
  description: null | string
  draft: boolean
  id: number
  journeySteps: JourneyStepSerialized[]
  museumId: number
  name: string
  updatedAt: string
}
