import React from "react";
import { ThemeProvider } from "ui";

import { Authentification } from "./screens/login/authentification";
import { Sidebar } from "./shared/components/sidebar";
import { useRoute } from "./utils/router";
import { useClerk } from "@clerk/clerk-react";

/**
 * App component.
 */
export function App() {
  const route = useRoute(["login", "data", "journey", "robot"]);
  const { session } = useClerk();

  if (session?.status !== "active") {
    return (
      <ThemeProvider theme="light">
        <Authentification />
      </ThemeProvider>
    );
  } else {
    switch (route?.name) {
      case "data": {
        return (
          <ThemeProvider theme="light">
            <Sidebar />
            <div className="pl-44">Data</div>
          </ThemeProvider>
        );
      }

      case "journey": {
        return (
          <ThemeProvider theme="light">
            <Sidebar />
            <div className="pl-44">journey</div>
          </ThemeProvider>
        );
      }

      case "robot": {
        return (
          <ThemeProvider theme="light">
            <Sidebar />
            <div className="pl-44">robot</div>
          </ThemeProvider>
        );
      }

      default: {
        return (
          <ThemeProvider theme="light">
            <Sidebar />
            <div className="pl-44">Not found</div>
          </ThemeProvider>
        );
      }
    }
  }
}
