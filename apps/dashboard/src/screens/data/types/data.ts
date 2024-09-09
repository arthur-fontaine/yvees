export interface VisitSerialized {
  createdAt: string
  id: number
  inProgress: boolean
  journeyId: number
  museumId: number
  updatedAt: string
  userId: string
}

export interface ChartData {
  month: string
  visits: number
}
