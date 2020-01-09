import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import DashboardLinksSection from "./DashboardLinkSection";

import styles from "./styles";

const DashboardLinks = ({ classes, sections }) => {
  return (
    <Grid className={classes.dashboardLinksContainer} container spacing={4}>
      <DashboardLinksSection serviceSections={sections} />
    </Grid>
  );
};

DashboardLinks.propTypes = {
  classes: PropTypes.object,
  currentOffice: PropTypes.object,
  email: PropTypes.string,
  items: PropTypes.array,
  realhubToken: PropTypes.string
};

export default withStyles(styles)(DashboardLinks);
