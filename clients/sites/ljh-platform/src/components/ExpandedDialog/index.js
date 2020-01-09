import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

const ExpandedDialog = ({ classes, children, title, onClose }) => {
  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullWidth
      open={true}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

ExpandedDialog.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  onClose: PropTypes.func,
  title: PropTypes.string
};

export default withStyles(styles)(ExpandedDialog);
