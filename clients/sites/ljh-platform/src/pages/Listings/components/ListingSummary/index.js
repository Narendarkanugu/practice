import PropTypes from "prop-types";
import React from "react";
import { Card, CardContent, Grid, Paper } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./styles";

const ListingSummary = props => {
  const { classes, pendingTotalCount } = props;

  if (pendingTotalCount < 0) {
    return;
  }

  return (
    <Grid item xs={12}>
      <Paper>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            Total Pending Actions: {pendingTotalCount}
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
};

ListingSummary.defaultPropTypes = {
  pendingTotalCount: 0
};

ListingSummary.propTypes = {
  pendingTotalCount: PropTypes.number
};

export default withStyles(styles)(ListingSummary);
