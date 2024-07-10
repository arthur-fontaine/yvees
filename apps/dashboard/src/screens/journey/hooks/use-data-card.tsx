import { createRoute } from 'agrume'
import * as DI from 'diabolo'
import { serverImpls } from '../../../utils/server-impls'
import { journeyService } from '../../../services/journey-service/journey-service'
import { useEffect, useState } from 'react'
// import { Journey } from 'db'
import { useClerk } from "@clerk/clerk-react";
import type { JourneySerialized } from '../types/data-card'


export const getJourney = createRoute(DI.provide(async function* (clerkOrganizationId: string | undefined) {
  if (!clerkOrganizationId) {
    return [];
  }
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

// const insertJourney = createRoute(
//   DI.provide(async function* ({ clerkOrganizationId, journey }: { clerkOrganizationId: string, journey: Journey }) {
//     const { createJourneyByMuseumId } = yield* DI.requireService(journeyService);
//     await createJourneyByMuseumId({ clerkOrganizationId, journey });
//     return { success: true };
//   }, serverImpls)
// );

// export const useInsertJourney = async ({ clerkOrganizationId, journey }: { clerkOrganizationId: string, journey: Journey }) => {
//   return await insertJourney({ clerkOrganizationId, journey });
// };

export function useDataBoard() {
  const session = useClerk()
  const clerkOrganizationId = session.user?.organizationMemberships[0]?.organization.id
  const [journey, setJourney] = useState<JourneySerialized[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJourney(clerkOrganizationId).then((journey) => {
      setJourney(journey);
      setLoading(false);
      console.log(journey)
    });
  }, [clerkOrganizationId]);
  return { journey, loading }
};



