import React from "react";
import { useRoute } from "../../utils/router";
import { JourneyList } from "./screens/list-journey";
import { JourneyCreate } from "./screens/create-journey";

/**
 * Journey screen.
 */
export function Journey() {
  const route = useRoute(["journeycreate"]);
  switch (route?.name) {
    default: {
      return (
        <JourneyList/>
      );
    }
    case "journeycreate": {
      return (
        <JourneyCreate/>
      );
    }
  }
}
