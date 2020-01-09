import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Error from "../Error";
import styles from "./styles";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { classes, children } = this.props;
    const { errorInfo } = this.state;

    if (errorInfo) {
      // Error path
      return (
        <Grid
          className={classes.errorBoundary}
          container
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <Error />
          </Grid>
        </Grid>
      );
    }
    // Normally, just render children
    return children;
  }
}

ErrorBoundary.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default withStyles(styles)(ErrorBoundary);
