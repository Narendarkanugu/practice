import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

import ActionButton from '@clients-modules/react/lib/components/ActionButton';

function ConfirmDialog({
  title,
  contentText,
  open,
  onClose,
  onCancel,
  onConfirm,
  loading,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {contentText && <DialogContentText>{contentText}</DialogContentText>}
      </DialogContent>
      {(onCancel || onConfirm) && (
        <DialogActions>
          {onCancel && (
            <ActionButton onClick={onCancel} disabled={loading}>
              Cancel
            </ActionButton>
          )}
          {onConfirm && (
            <ActionButton onClick={onConfirm} loading={loading}>
              Confirm
            </ActionButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  contentText: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  loading: PropTypes.bool,
};

export default ConfirmDialog;
