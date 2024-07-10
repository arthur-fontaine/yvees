export interface JourneyStepSerialized {
  id: number;
  journeyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface JourneySerialized {
  id: number;
  museumId: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  draft: boolean;
  averageVisitDuration: number;
  journeySteps: JourneyStepSerialized[];
}
