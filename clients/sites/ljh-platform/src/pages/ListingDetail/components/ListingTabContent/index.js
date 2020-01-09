import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { DEMO_LISTING } from "../../../../constants";

import ListingInfo from "../ListingInfo";
import ListingReport from "../ListingReport";
import ListingTimeline from "../ListingTimeline";
import ListingInspections from "../ListingInspections";
import ListingDocuments from "../ListingDocuments";

import styles from "./styles";

const TABS = {
  timeline: ListingTimeline,
  listing: ListingInfo,
  inspections: ListingInspections,
  documents: ListingDocuments,
  report: ListingReport
};

const TabContainer = ({ classes, children }) => (
  <div className={classes.tabContainer}>
    <Paper className={classes.tabContent} elevation={1}>
      {children}
    </Paper>
  </div>
);

const ListingTabs = ({ listing, classes, currentTab, tabParams }) => {
  return (
    <React.Fragment>
      {map(
        TABS,
        (Component, k) =>
          k === currentTab && (
            <TabContainer key={k} classes={classes}>
              <Component
                {...listing}
                disableActions={listing.listingId === DEMO_LISTING}
                tabParams={tabParams && tabParams.search}
              />
            </TabContainer>
          )
      )}
    </React.Fragment>
  );
};

ListingTabs.propTypes = {
  classes: PropTypes.object,
  currentTab: PropTypes.string.isRequired,
  listing: PropTypes.object.isRequired
};

export default withStyles(styles)(ListingTabs);
