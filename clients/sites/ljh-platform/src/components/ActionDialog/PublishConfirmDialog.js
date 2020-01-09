import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
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
import { useMutation } from "react-apollo-hooks";
import ActionButton from "@clients-modules/react/lib/components/ActionButton";
import ActionsContext from "../../contexts/ActionsContext";
import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import mutationPublishListingAction from "../../graphql/mutationPublishListingAction";
import NotificationContext from "../../contexts/NotificationContext";
import { listingActionsCache, listingTimelineCache } from "../../helpers/cache";

const PublishConfirmDialog = ({ card, onClose }) => {
  const [notifyVendor, setNotifyVendor] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const { hideActivityId, sourceComponent } = useContext(ActionsContext);
  const [loading, setLoading] = useState(false);

  const publishListingAction = useMutation(mutationPublishListingAction);

  const onPublishConfirmed = async () => {
    setLoading(true);

    try {
      const { id, listingId, title } = card;

      await publishListingAction({
        variables: {
          activityId: id,
          notifyVendor
        },
        update: (
          cache,
          {
            data: {
              publishListingAction: { card }
            }
          }
        ) => {
          var updateCard;
          switch(sourceComponent){
            case "actions":
                const actionsCache = listingActionsCache(cache, listingId);
                updateCard=actionsCache.updateCard;
              break;
            case "timelineListing" :
                const timelineCache = listingTimelineCache(cache, listingId);
                updateCard=timelineCache.updateCard;
              break;
            default:
                break;
          }
          updateCard(card);
        }
      });

      ljhAnalytics.track("Listing action published", {
        activityId: id,
        listingId,
        title
      });

      showNotification({
        message: "Action published successfully",
        type: "success"
      });
      hideActivityId(id);
    } catch (e) {
      showNotification &&
        showNotification({
          message: "Something went wrong publishing this action",
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
      <DialogTitle>Publish to vendor?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Publishing will make this card visible to the vendor.
        </DialogContentText>
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
      </DialogContent>
      <DialogActions>
        <ActionButton onClick={onClose}>Cancel</ActionButton>
        <ActionButton onClick={onPublishConfirmed} loading={loading}>
          Confirm
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
};

PublishConfirmDialog.propTypes = {
  card: PropTypes.object,
  onClose: PropTypes.func
};

export default PublishConfirmDialog;
