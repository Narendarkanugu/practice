import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ActionsLayout from "../ActionsLayout";

const ActionsError = props => (
  <ActionsLayout>
    <Grid item>
      <Typography component="h6" variant="h6">
        {props.message}
      </Typography>
    </Grid>
  </ActionsLayout>
);

ActionsError.defaultPropTypes = {
  classes: {},
  message: "An unknown error occurred."
};

ActionsError.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.string.isRequired
};

export default ActionsError;
