import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "../Icon";

const Error = ({ message }) => {
  const referenceCode = message.substring(
    message.indexOf("Ref:"),
    message.lastIndexOf("]")
  );
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item align="center">
        <Icon
          iconName={"exclamation-circle"}
          iconSize={100}
          iconColor="#bdbdbd"
        />
        <Typography color="textSecondary" variant="h6" gutterBottom>
          Something went wrong
        </Typography>
        <Typography component="div">
          {referenceCode
            ? `An error occurred (${referenceCode}). `
            : "An unknown error occurred. "}
          Please try again later.
        </Typography>
      </Grid>
    </Grid>
  );
};

Error.defaultProps = {
  message: ""
};

Error.propTypes = {
  message: PropTypes.string
};

export default Error;
