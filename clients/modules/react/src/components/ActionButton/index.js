import React from "react";
import PropTypes from "prop-types";

import { CircularProgress, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

const ActionButton = ({ disabled, loading, classes, children, onClick }) => {
  return (
    <div className={classes.wrapper}>
      <Button
        color="secondary"
        disabled={disabled || loading}
        onClick={onClick}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

ActionButton.defaultProps = {
  disabled: false,
  loading: false
};

export default withStyles(styles)(ActionButton);
