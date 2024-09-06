import { db } from 'db/runtime/server'
import { journeySteps } from 'db/schema'
import { lazyCreateServiceImpl } from 'diabolo'
import { eq } from 'drizzle-orm'

import type { JourneyStepService } from './journey-step-service'

export const journeyStepServiceImpl = lazyCreateServiceImpl<JourneyStepService>(
  () => ({
    createJourneyStepByJourneyId: async ({ journeyStep }) => {
      const journey = await db.query.journeys.findFirst({
        where: (journeys, { eq }) => eq(journeys.id, journeyStep.journeyId),
      })

      if (!journey) {
        console.error('Journey not found')
      }

      if (journey !== undefined) {
        await db
          .insert(journeySteps)
          .values({
            ...journeyStep,
          })
          .returning()
      }
    },

    deleteJourneyStepsByJourneyStepId: async ({ journeyStepId }) => {
      const journeyStep = await db.query.journeySteps.findFirst({
        where: (journeySteps, { eq }) =>
          eq(journeySteps.id, journeyStepId),
      })

      if (!journeyStep) {
        console.error('Journey step not found')
        return
      }

      await db
        .delete(journeySteps)
        .where(eq(journeySteps.id, journeyStepId))
    },
  }),
)
