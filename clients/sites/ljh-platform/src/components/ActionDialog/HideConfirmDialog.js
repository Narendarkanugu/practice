import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { useMutation } from "react-apollo-hooks";

import ActionButton from "@clients-modules/react/lib/components/ActionButton";
import { listingActionsCache, listingTimelineCache } from "../../helpers/cache";
import ActionsContext from "../../contexts/ActionsContext";
import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import mutationHideListingAction from "../../graphql/mutationHideListingAction";
import NotificationContext from "../../contexts/NotificationContext";

const HideConfirmDialog = ({ card, onClose }) => {
  const { showNotification } = useContext(NotificationContext);
  const { hideActivityId, sourceComponent } = useContext(ActionsContext);
  const [loading, setLoading] = useState(false);

  const popUpHeading = (sourceComponent) => {
    if (sourceComponent === "actions" || (card && card.status === "pending"))
      return "Hide from actions?";
    else if (sourceComponent === "timelineListing")
      return "Hide from timeline?";
  }

  const popUpMessage = (sourceComponent) => {
    if (sourceComponent === "actions" || (card && card.status === "pending"))
      return "  Hiding will remove this card from your outstanding actions.";
    else if (sourceComponent === "timelineListing")
      return "Hiding will remove this card from the timeline and it will no longer be visible to the vendor.";
  }

  const hideListingAction = useMutation(mutationHideListingAction);

  const onHideConfirmed = async () => {
    setLoading(true);

    try {
      const { id, listingId, title } = card;

      await hideListingAction({
        variables: {
          activityId: id
        },
        update: (
          cache,
          {
            data: {
              hideListingAction: { card }
            }
          }
        ) => {
          var updateCard;
          switch (sourceComponent) {
            case "actions":
              const actionsCache = listingActionsCache(cache, listingId);
              updateCard = actionsCache.updateCard;
              break;
            case "timelineListing":
              const timelineCache = listingTimelineCache(cache, listingId);
              updateCard = timelineCache.updateCard;
              break;
            default:
              break;
          }
          updateCard(card);
        }
      });

      ljhAnalytics.track("Listing action suppressed", {
        activityId: id,
        listingId,
        title
      });

      showNotification({
        message: "Action hidden successfully",
        type: "success"
      });
      hideActivityId(id);
    } catch (e) {
      showNotification &&
        showNotification({
          message: "Something went wrong hiding this action",
          type: "error"
        });
    }

    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{popUpHeading(sourceComponent)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {popUpMessage(sourceComponent)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ActionButton onClick={onClose}>Cancel</ActionButton>
        <ActionButton onClick={onHideConfirmed} loading={loading}>
          Confirm
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
};

HideConfirmDialog.propTypes = {
  card: PropTypes.object,
  onClose: PropTypes.func,
};

export default HideConfirmDialog;
