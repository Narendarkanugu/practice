import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "../Icon";

const EmptyState = ({ content, iconName, iconSize, title }) => {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item align="center">
        <Icon
          iconType="FontAwesome"
          iconName={iconName}
          iconSize={iconSize}
          iconColor="#bdbdbd"
        />
        <Typography color="textSecondary" variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography component="div">{content}</Typography>
      </Grid>
    </Grid>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};

EmptyState.defaultProps = {
  title: "",
  iconName: "",
  content: "",
  iconSize: 100
};

export default EmptyState;
