import PropTypes from "prop-types";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { AppBar, Grid, Link, Toolbar, Typography } from "@material-ui/core";

import styles from "./styles";

const Footer = ({ classes, version }) => {
  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={classes.appToolBar}>
        <Grid container justify="space-between">
          <Grid item>
            <Link
              color="inherit"
              href="https://www.ljhooker.com.au"
              noWrap
              variant="body1"
              target="_blank"
            >
              &copy; {1900 + new Date().getYear()} LJ Hooker
            </Link>
          </Grid>
          {version && (
            <Grid item>
              <Typography color="inherit">v{version}</Typography>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  version: PropTypes.string
};

export default withStyles(styles)(Footer);
