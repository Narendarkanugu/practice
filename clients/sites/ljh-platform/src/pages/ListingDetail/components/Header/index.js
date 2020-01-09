import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles } from '@material-ui/core';

import styles from './styles';

function Header({ classes, title, actionButton }) {
  return (
    <div className={classes.root}>
      <Grid alignItems="center" justify="space-between" container spacing={2}>
        {title && (
          <Grid item>
            <Typography variant="h6">{title}</Typography>
          </Grid>
        )}
        {actionButton && <Grid item>{actionButton}</Grid>}
      </Grid>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  actionButton: PropTypes.node,
};

export default withStyles(styles)(Header);
