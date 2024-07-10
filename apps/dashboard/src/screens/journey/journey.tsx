import React from "react";
import { useRoute } from "../../utils/router";
import { JourneyList } from "./screens/list-journey";
import { JourneyCreate } from "./screens/create-journey";
import { ThemeProvider } from "ui";

/**
 * Journey screen.
 */
export function Journey() {
  const route = useRoute(["journeycreate"]);
  switch (route?.name) {
    default: {
      return (
        <ThemeProvider theme="light">
          <JourneyList/>
        </ThemeProvider>
      );
    }
    case "journeycreate": {
      return (
      <ThemeProvider theme="light">
        <JourneyCreate/>
      </ThemeProvider>
      );
    }
  }
}
