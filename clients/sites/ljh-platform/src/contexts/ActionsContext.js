import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import { filter, size } from "lodash";

import { ACTION_DIALOGS } from "../constants";
import EditPostDialog from "../components/ActionDialog/EditPostDialog";
import HideConfirmDialog from "../components/ActionDialog/HideConfirmDialog";
import PublishConfirmDialog from "../components/ActionDialog/PublishConfirmDialog";
import queryGetListingActions from "../graphql/queryGetListingActions";

const ActionsContext = React.createContext({});

const ActionsContextProvider = ({ children }) => {
  const [filteredActivityIds, setFilteredActivityIds] = useState([]);
  const [showPublishConfirmDialog, setPublishConfirmDialog] = useState(false);
  const [showHideConfirmDialog, setHideConfirmDialog] = useState(false);
  const [showEditPostDialog, setEditPostDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [sourceComponent, setSourceComponent] = useState(null);

  const { data, error, loading } = useQuery(queryGetListingActions, {
    fetchPolicy: "cache-and-network"
  });

  const setComponent = comp =>{
     setSourceComponent(comp);
   }

  var cards = [];
  if (data && data.getListingActions && data.getListingActions.cards) {
    cards = data.getListingActions.cards;
  }

  const getActionCardCount = () => {
    if (!cards || loading || error) {
      return 0;
    }

    return size(filter(cards, x => !filteredActivityIds.includes(x.id)));
  };
  const getActionCardCountByListingId = listingId => {
    if (loading) {
      return -1;
    } else if (error) {
      return 0;
    }
    if (getActionCardsByListingId(listingId) === -1) {
      return -1;
    } else {
      return size(getActionCardsByListingId(listingId));
    }
  };

  const getActionCardsByListingId = listingId => {
    if (loading) {
      return -1;
    } else if (error) {
      return null;
    }

    return filter(
      cards,
      x => x.listingId === listingId && !filteredActivityIds.includes(x.id)
    );
  };

  const hideActivityId = activityId => {
    setFilteredActivityIds([...filteredActivityIds, activityId]);
  };

  const toggleDialog = (dialogType, card) => {
    setSelectedCard(card);

    switch (dialogType) {
      case ACTION_DIALOGS["hide-confirm"]:
        setHideConfirmDialog(!showHideConfirmDialog);
        break;
      case ACTION_DIALOGS["publish-confirm"]:
        setPublishConfirmDialog(!showPublishConfirmDialog);
        break;
      case ACTION_DIALOGS["edit-post"]:
        setEditPostDialog(!showEditPostDialog);
        break;
      default:
        break;
    }
  };

  return (
    <ActionsContext.Provider
      value={{
        error,
        getActionCardCountByListingId,
        getActionCardsByListingId,
        hideActivityId,
        actionCardCount: getActionCardCount(),
        loading,
        toggleDialog,
        setComponent,
        sourceComponent
      }}
    >
      {showHideConfirmDialog && (
        <HideConfirmDialog
          onClose={() => toggleDialog(ACTION_DIALOGS["hide-confirm"], null)}
          card={selectedCard}
        />
      )}
      {showPublishConfirmDialog && (
        <PublishConfirmDialog
          onClose={() => toggleDialog(ACTION_DIALOGS["publish-confirm"], null)}
          card={selectedCard}
        />
      )}
      {showEditPostDialog && (
        <EditPostDialog
          onClose={() => toggleDialog(ACTION_DIALOGS["edit-post"], null)}
          card={selectedCard}
        />
      )}
      {children}
    </ActionsContext.Provider>
  );
};

ActionsContextProvider.propTypes = {
  actions: PropTypes.shape({
    cards: PropTypes.array
  }),
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  loading: PropTypes.bool.isRequired
};

export default ActionsContext;
export { ActionsContextProvider };
