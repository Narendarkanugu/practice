import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Tooltip
} from "@material-ui/core";
import isNil from "lodash/isNil";
import ActionButton from "@clients-modules/react/lib/components/ActionButton";
import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import mutationPutListingInspectionCampaign from "../../graphql/mutationPutListingInspectionCampaign";
import NotificationContext from "../../../../contexts/NotificationContext";
import { listingInspectionsCache } from "../../../../helpers/cache";

const InspectionStatusDialog = ({ selectedInspection, onClose }) => {
  const isPublishing = !selectedInspection.published;
  const updatedStatus = isPublishing ? "published" : "unpublished";
  const isFirstPublish = isNil(selectedInspection.publishedTimestamp);

  // Tick Notify Vendor by default if inspection hasn't been published before
  const [notifyVendor, setNotifyVendor] = useState(isFirstPublish);
  const { showNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const putListingInspectionCampaign = useMutation(
    mutationPutListingInspectionCampaign
  );

  const onStatusUpdateConfirmed = async () => {
    setLoading(true);

    const updatedInspection = {
      ...selectedInspection,
      notifyVendor,
      published: isPublishing
    };

    try {
      await putListingInspectionCampaign({
        variables: updatedInspection,
        update: cache => {
          const { updateInspection } = listingInspectionsCache(
            cache,
            updatedInspection.listingId
          );
          updateInspection(updatedInspection);
        }
      });

      ljhAnalytics.track(`Inspection ${updatedStatus}`, {
        inspectionId: updatedInspection.inspectionId,
        listingId: updatedInspection.listingId
      });

      showNotification({
        message: `Inspection ${updatedStatus} successfully`,
        type: "success"
      });
    } catch (e) {
      showNotification({
        message: `Something went wrong updating this inspection`,
        type: "error"
      });
    }

    setLoading(false);
    onClose();
  };

  const toggleNotifyVendor = () => {
    setNotifyVendor(!notifyVendor);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {isPublishing ? "Publish to vendor?" : "Unpublish from vendor?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`${
            isPublishing ? "Publishing" : "Unpublishing"
          } will make this inspection summary ${
            isPublishing ? "visible" : "invisible"
          } to the vendor.`}
        </DialogContentText>
        {/* Only allow sending of notifications to vendors on first publish */}
        {isPublishing && isFirstPublish && (
          <FormControl fullWidth>
            <Tooltip
              title="Checking this box will send a push notification to all the vendors you have added to this listing"
              placement="bottom-start"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={notifyVendor}
                    onChange={toggleNotifyVendor}
                  />
                }
                label="Notify vendors"
              />
            </Tooltip>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <ActionButton onClick={onClose}>Cancel</ActionButton>
        <ActionButton onClick={onStatusUpdateConfirmed} loading={loading}>
          Confirm
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
};

InspectionStatusDialog.propTypes = {
  selectedInspection: PropTypes.object,
  onClose: PropTypes.func
};

export default InspectionStatusDialog;
