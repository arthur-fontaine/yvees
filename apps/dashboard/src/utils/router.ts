import { createGroup, createRouter } from "@swan-io/chicane";

export const router = createRouter({
  data: "/data",
  ...createGroup("journey", "/journey", {
    createJourney: "/create-journey",
    createJourneyStep: "/create-journey-step/:journeyId",
    home: "/:journeyId",
    list: "/",
  }),
  login: "/login",
  robot: "/robot",
});

export const useRoute = router.useRoute;
