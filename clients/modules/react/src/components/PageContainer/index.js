import React from "react";
import PropTypes from "prop-types";
import { Divider, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./styles";

const PageContainer = ({ classes, children, title }) => {
  return (
    <div className={classes.pageWrapper}>
      {title && (
        <div className={classes.headerContainer}>
          <Typography component="h1" variant="h4">
            {title}
          </Typography>
          <Divider className={classes.headerDivider} />
        </div>
      )}
      <div className={classes.contentContainer}>
        <div>{children}</div>
      </div>
    </div>
  );
};

PageContainer.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

PageContainer.defaultProps = {
  classes: {}
};

export default withStyles(styles)(PageContainer);
