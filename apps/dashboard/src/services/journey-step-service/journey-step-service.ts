import type { Service } from "diabolo";
import { createService } from "diabolo";

import type { JourneyStepForm } from "../../screens/journey/types/create-journey-step";

export interface JourneyStepService
  extends Service<
    "journeyStep",
    {
      createJourneyStepByJourneyId: (params: {
        journeyStep: JourneyStepForm;
      }) => Promise<void>;
      deleteJourneyStepsByJourneyStepId: (params: {
        journeyStepId: string;
      }) => Promise<void>;
    }
  > {}

export const journeyStepService =
  createService<JourneyStepService>("journeyStep");
