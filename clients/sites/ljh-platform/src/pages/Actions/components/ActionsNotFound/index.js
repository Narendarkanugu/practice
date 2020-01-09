import React from "react";
import EmptyState from "@clients-modules/react/lib/components/EmptyState";

const ActionsNotFound = () => {
  return (
    <EmptyState
      title="You're all up to date!"
      iconName="check-circle"
      iconSize={64}
      content="There are no actions required at this time."
    />
  );
};

export default ActionsNotFound;
