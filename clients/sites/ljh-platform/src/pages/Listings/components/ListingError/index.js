import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ListingLayout from "../ListingLayout";

const ListingError = props => (
  <ListingLayout>
    <Grid item>
      <Typography component="h6" variant="h6">
        {props.message}
      </Typography>
    </Grid>
  </ListingLayout>
);

ListingError.defaultPropTypes = {
  classes: {},
  message: "An unknown error occurred."
};

ListingError.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.string.isRequired
};

export default ListingError;
