import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

class ListingReportStatistic extends React.Component {
  render() {
    const { classes, statData } = this.props;

    if (!statData) {
      return null;
    }

    return statData.map(item => (
      <div key={`${item.text}-${item.value}`} className={classes.stats}>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h4" className={classes.statNumber}>
              {item.value}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6" className={classes.statText}>
              {item.text}
            </Typography>
          </Grid>
        </Grid>
      </div>
    ));
  }
}

export default withStyles(styles)(ListingReportStatistic);
