import queryGetListingTimelineForAgent from "../pages/Listings/graphql/queryGetListingTimelineForAgent";
import queryGetListingInspectionCampaigns from "../pages/Listings/graphql/queryGetListingInspectionCampaigns";
import queryGetListingDetailsById from "../pages/Listings/graphql/queryGetListingDetailsById";
import queryGetListingActions from "../graphql/queryGetListingActions";

const listingTimelineCache = (cache, listingId) => {
  const { getListingTimelineForAgent } = cache.readQuery({
    query: queryGetListingTimelineForAgent,
    variables: { listingId }
  });

  const writeToCache = updatedListingTimeline => {
    cache.writeQuery({
      query: queryGetListingTimelineForAgent,
      variables: { listingId },
      data: { getListingTimelineForAgent: updatedListingTimeline }
    });
  };

  return {
    addCard: card => {
      const { cards } = getListingTimelineForAgent;

      if (cards.find(x => x.id === card.id)) {
        // Don't update cache if card already exists
        return;
      }

      const updatedListingTimeline = { ...getListingTimelineForAgent };
      updatedListingTimeline.cards.push(card);
      updatedListingTimeline.cards.sort(
        (a, b) => new Date(b.eventDateTime) - new Date(a.eventDateTime)
      );

      writeToCache(updatedListingTimeline);
    },
    updateCard: card => {
      const { cards } = getListingTimelineForAgent;

      const cardToUpdateIndex = cards.findIndex(x => x.id === card.id);
      if (cardToUpdateIndex === -1) {
        // Don't update cache if card doesn't exist
        return;
      }

      const updatedListingTimeline = { ...getListingTimelineForAgent };
      updatedListingTimeline.cards[cardToUpdateIndex] = {
        ...updatedListingTimeline.cards[cardToUpdateIndex],
        ...card
      };
      updatedListingTimeline.cards.sort(
        (a, b) => new Date(b.eventDateTime) - new Date(a.eventDateTime)
      );

      writeToCache(updatedListingTimeline);
    },
    removeCard: card => {
      const updatedListingTimeline = { ...getListingTimelineForAgent };
      updatedListingTimeline.cards = updatedListingTimeline.cards.filter(
        x => x.id !== card.id
      );

      writeToCache(updatedListingTimeline);
    }
  };
};

const listingInspectionsCache = (cache, listingId) => {
  const { getListingInspectionCampaigns } = cache.readQuery({
    query: queryGetListingInspectionCampaigns,
    variables: { listingId }
  });

  const writeToCache = updatedListingInspectionCampaigns => {
    cache.writeQuery({
      query: queryGetListingInspectionCampaigns,
      variables: { listingId },
      data: { getListingInspectionCampaigns: updatedListingInspectionCampaigns }
    });
  };

  return {
    updateInspection: inspection => {
      const inspectionCampaigns = getListingInspectionCampaigns;
      const inspectionToEditIndex = inspectionCampaigns.findIndex(
        x => x.inspectionId === inspection.inspectionId
      );

      const updatedListingInspectionCampaigns = [...inspectionCampaigns];
      if (inspectionToEditIndex === -1) {
        // Inspection campaign doesn't exist in the DB yet - adding new inspection
        updatedListingInspectionCampaigns.push({
          ...inspection,
          startDateTime: "",
          endDateTime: "",
          published: false,
          publishedTimestamp: null,
          __typename: "ListingInspectionCampaign"
        });
      } else {
        // Inspection campaign exists in the DB - updating inspection
        updatedListingInspectionCampaigns[inspectionToEditIndex] = {
          ...updatedListingInspectionCampaigns[inspectionToEditIndex],
          ...inspection
        };
      }

      writeToCache(updatedListingInspectionCampaigns);
    }
  };
};

const listingVendorCache = (cache, listingId) => {
  const { getListingDetailsById } = cache.readQuery({
    query: queryGetListingDetailsById,
    variables: { listingId }
  });

  const writeToCache = updatedListing =>
    cache.writeQuery({
      query: queryGetListingDetailsById,
      data: { getListingDetailsById: updatedListing },
      variables: { listingId }
    });

  return {
    addVendor: ({ name, email }) => {
      const { vendors } = getListingDetailsById;
      if (vendors.find(x => x.email === email)) {
        // Don't update cache if vendor already exists
        return;
      }

      const updatedVendors = [
        ...vendors,
        {
          name,
          email,
          sourceCrm: false,
          pictureUrl: "",
          lastActive: null,
          __typename: "ListingVendor"
        }
      ];

      const updatedListing = {
        ...getListingDetailsById,
        vendors: updatedVendors
      };

      writeToCache(updatedListing);
    },
    removeVendor: email => {
      const updatedListing = { ...getListingDetailsById };
      updatedListing.vendors = updatedListing.vendors.filter(
        x => x.email !== email
      );

      writeToCache(updatedListing);
    }
  };
};

const listingActionsCache = (cache, listingId) => {

  const { getListingActions } = cache.readQuery({
    query: queryGetListingActions
  });

  const writeToCache = updatedListingActions => {
    cache.writeQuery({
      query: queryGetListingActions,
      data: { getListingActions: updatedListingActions }
    });
  };
  return {
    updateCard: card => {
      const { cards } = getListingActions;

      const cardToUpdateIndex = cards.findIndex(x => x.id === card.id);
      if (cardToUpdateIndex === -1) {
        // Don't update cache if card doesn't exist
        return;
      }

      const updatedListingActions = { ...getListingActions };
      updatedListingActions.cards[cardToUpdateIndex] = {
        ...updatedListingActions.cards[cardToUpdateIndex],
        ...card
      };
      // updatedListingActions.cards.sort(
      //   (a, b) => new Date(b.eventDateTime) - new Date(a.eventDateTime)
      // );

      writeToCache(updatedListingActions);
    }
  }

}

export { listingInspectionsCache, listingTimelineCache, listingVendorCache, listingActionsCache };
