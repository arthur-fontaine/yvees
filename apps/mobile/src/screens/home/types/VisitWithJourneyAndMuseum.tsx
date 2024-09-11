import type { Visit , Journey , Museum} from 'db'

export type VisitWithJourneyAndMuseum = Visit & {
    journey: Journey & {
      museum: Museum;
    };
};