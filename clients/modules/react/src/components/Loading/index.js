import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AnimatedLoader from "./AnimatedLoader"

import styles from "./styles";

const Loading = ({ classes, align, text, position }) => {
  return (
    <div
      className={classes.loadingContainer}
      style={{
        alignItems: align,
        position: position ? "unset" : "absolute",
      }}
    >
      <div className={classes.textContainer}>
        {text ? <Typography gutterBottom>{text}</Typography> : <Typography gutterBottom>Loading...</Typography>}
        <AnimatedLoader />
      </div>
    </div>
  );
};

Loading.propTypes = {
  classes: PropTypes.object,
  align: PropTypes.string,
  margin: PropTypes.string,
  minHeight: PropTypes.number,
  text: PropTypes.string
};

Loading.defaultProps = {
  classes: {},
  align: "center",
};

export default withStyles(styles)(Loading);
