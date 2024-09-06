import React from "react";
import { Box } from "ui";

interface DefaultLayoutProps extends React.PropsWithChildren {}

/**
 * The default layout for the application.
 */
export function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <Box
      backgroundColor="$backgroundColor"
      flex={1}
      padding={props.withPadding === false ? 0 : "$normal"}
    >
      {props.children}
    </Box>
  );
}
