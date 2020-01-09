import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./styles";

const RealHubWarningDialog = ({ classes, show, onClose }) => {
  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>Realhub not linked</DialogTitle>
      <div className={classes.dialogContent}>
        <Typography variant="body1" paragraph>
          Your Realhub username is not linked to your LJ Hooker account.
        </Typography>
        <Typography variant="body1" paragraph>
          Please login using your Realhub credentials via&nbsp;
          <a
            href="https://www.realhubapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.realhubapp.com
          </a>
        </Typography>
        <Typography variant="body1">
          Alternative, please contact the team at Realhub on 02 9029 4025 or
          email&nbsp;
          <a
            href="mailto:support@realhub.com.au"
            target="_blank"
            rel="noopener noreferrer"
          >
            support@realhub.com.au
          </a>
          &nbsp; for further assistance.
        </Typography>
      </div>
      <DialogActions>
        <Button
          onClick={() => window.open("https://www.realhubapp.com", "_blank")}
          color="secondary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RealHubWarningDialog.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(RealHubWarningDialog);
