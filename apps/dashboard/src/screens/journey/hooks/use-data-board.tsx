import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { serverImpls } from '../../../utils/server-impls'
import { journeyService } from '../../../services/journey-service/journey-service'
import { museumService } from '../../../services/museum-service/museum-service'
import { useEffect, useState } from 'react'
import { Journey } from 'db'

interface JourneyStepSerialized  {
  id: number;
  journeyId: number;
  createdAt: string;
  updatedAt: string;
}

interface JourneySerialized {
  id: number;
  museumId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  draft: boolean;
  averageVisitDuration: number;
  journeySteps: JourneyStepSerialized[];
}


const sayHello = createRoute(
  async (name: string) => {
    return `Hello ${name}!`
  },
)

const getJourney = createRoute(DI.provide(async function* (clerkOrganizationId: string) {
  const { findJourneysByMuseumId } = yield* DI.requireService(journeyService);
  const journeys = await findJourneysByMuseumId({ clerkOrganizationId });
  return journeys?.map((journey) => {
    return {
      ...journey,
      journeySteps: journey.journeySteps?.map((step) => {
        return {
          ...step,
          createdAt: step.createdAt?.toISOString(),
          updatedAt: step.updatedAt?.toISOString(),
        };
      }) ?? [],
      createdAt: journey.createdAt?.toISOString(),
      updatedAt: journey.updatedAt?.toISOString(),
    };
  }) ?? [];
}, serverImpls));

const insertJourney = createRoute(
  DI.provide(async function* ({ clerkOrganizationId, journey }: { clerkOrganizationId: string, journey: Journey }) {
    const { createJourneyByMuseumId } = yield* DI.requireService(journeyService);
    await createJourneyByMuseumId({ clerkOrganizationId, journey });
    return { success: true };
  }, serverImpls)
);

const findMuseum = createRoute(DI.provide(async function* (clerkOrganizationId: string) {
  const { findMuseumById } = yield* DI.requireService(museumService);
  return await findMuseumById({ clerkOrganizationId });
}, serverImpls));

export const useFindMuseum = async (clerkOrganizationId: string) => {
  try {
    return await findMuseum(clerkOrganizationId);
  } catch (error) {
    console.error(error);
  }
};

//create a hook that insert journey
export const useInsertJourney = async ({ clerkOrganizationId, journey }: { clerkOrganizationId: string, journey: Journey }) => {
  return await insertJourney({ clerkOrganizationId, journey });
};

export const useDataBoard = async (clerkOrganizationId: string) => {
  const [journey, setJourney] = useState<JourneySerialized[] | null>(null);
  useEffect(() => {
    getJourney(clerkOrganizationId).then(setJourney);
  }, [clerkOrganizationId]);
  return journey;
};



