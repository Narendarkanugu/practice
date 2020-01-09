import React, { useContext, useState } from "react";
import { useMutation } from "react-apollo-hooks";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText
} from "@material-ui/core";

import { listingVendorCache } from "../../../../helpers/cache";
import ActionButton from "@clients-modules/react/lib/components/ActionButton";
import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import mutationRemoveVendorFromListing from "../../graphql/mutationRemoveVendorFromListing";
import NotificationContext from "../../../../contexts/NotificationContext";

const ListingVendorRemove = ({ listingId, show, email, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  const removeVendorFromListing = useMutation(mutationRemoveVendorFromListing);

  const handleConfirm = () => {
    setLoading(true);

    removeVendorFromListing({
      variables: { listingId, email },
      update: cache => {
        const { removeVendor } = listingVendorCache(cache, listingId);
        removeVendor(email);
      }
    })
      .then(() => {
        showNotification({
          message: `Vendor was successfully removed`,
          type: "success"
        });

        ljhAnalytics.track("Listing removed from Vendor", { listingId, email });
      })
      .catch(() => {
        showNotification({
          message: "Something went wrong removing this vendor",
          type: "error"
        });
      })
      .then(() => {
        setLoading(false);
        handleClose();
      });
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Remove vendor</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this vendor from the listing?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>

        <ActionButton onClick={handleConfirm} loading={loading}>
          Confirm
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
};

export default ListingVendorRemove;
