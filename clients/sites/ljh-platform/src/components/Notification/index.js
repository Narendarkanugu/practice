import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

const typeIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles = theme => ({
  success: {
    backgroundColor: teal['A700']
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: orange['A700']
  },
  icon: {
    fontSize: 20
  },
  iconType: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

const Notification = props => {
  const { classes, open, message, type, onClose } = props;
  const Icon = typeIcon[type];

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
      >
        {open ? (
          <SnackbarContent
            className={classes[type]}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon className={classNames(classes.icon, classes.iconType)} />
                {message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        ) : null}
      </Snackbar>
    </div>
  );
};

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func
};

export default withStyles(styles)(Notification);
