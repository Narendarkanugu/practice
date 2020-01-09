import React from "react";
import flowRight from "lodash/flowRight";
import Link from "@material-ui/core/Link";
import { Paper, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import EmptyState from "@clients-modules/react/lib/components/EmptyState";

import styles from "./styles";

const getRoleDetails = role => {
  switch (role) {
    case "administration":
      return {
        name: "Administration",
        description: "You should see all listings for your office."
      };
    case "franchise-owner":
      return {
        name: "Franchise Owner",
        description: "You should see all listings for your office."
      };
    case "franchise-services":
      return {
        name: "Franchise Services",
        description:
          "This is a head office role and is not used for showing listings."
      };
    case "property-manager":
      return {
        name: "Property Manager",
        description:
          "You won't see any listings / We are currently not using this App for rentals."
      };
    case "salesperson":
      return {
        name: "Salesperson",
        description:
          "You should see any listings you are linked to in your CRM."
      };
    default:
      return {};
  }
};

const ListingNotFound = ({ classes, currentRole }) => {
  const { name, description } = getRoleDetails(currentRole);
  return (
    <Paper className={classes.listingNotFoundPaper}>
      <EmptyState
        title="No listed residential properties available"
        iconName="home"
        content={[
          <Typography
            key={`${currentRole}-no-listing-${0}`}
          >{`Currently we have you registered as role: ${name}. ${description}`}</Typography>,
          <Typography key={`${currentRole}-no-listing-${1}`}>
            If you still aren’t seeing any listings and believe you should,
            please contact support at&nbsp;
            <Link
              href="mailto:support@ljhooker.com?Subject=Platform%20Support%20Request:%20Missing%20Listings"
              target="_top"
            >
              support@ljhooker.com
            </Link>
          </Typography>
        ]}
      />
    </Paper>
  );
};

export default flowRight(withStyles(styles))(ListingNotFound);
