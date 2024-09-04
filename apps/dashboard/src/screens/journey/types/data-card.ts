export interface JourneyStepSerialized {
  createdAt: string
  id: number
  journeyId: number
  updatedAt: string
  name: string
  description: null | string
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
