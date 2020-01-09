import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import { withStyles } from "@material-ui/core/styles";
import get from "lodash/get";

import queryGetListingInspectionCampaigns from "../../graphql/queryGetListingInspectionCampaigns";
import queryGetListingInspectionDetailsById from "../../graphql/queryGetListingInspectionDetailsById";

import Loading from "@clients-modules/react/lib/components/Loading";
import Error from "@clients-modules/react/lib/components/Error";

import ListingInspectionTable from "./ListingInspectionTable";
import ListingInspectionList from "./ListingInspectionList";
import EditInspectionDialog from "./EditInspectionDialog";
import InspectionStatusDialog from "./InspectionStatusDialog";

import styles from "./styles";

const ListingInspections = ({ classes, disableActions, listingId }) => {
  const [selectedInspection, setSelectedInspection] = useState({});

  const [showEditInspectionDialog, setShowEditInspectionDialog] = useState(
    false
  );
  const [showInspectionStatusDialog, setShowInspectionStatusDialog] = useState(
    false
  );

  const toggleEditInspectionDialog = selectedInspection => {
    setSelectedInspection(selectedInspection);
    setShowEditInspectionDialog(!showEditInspectionDialog);
  };

  const toggleInspectionStatusDialog = selectedInspection => {
    setSelectedInspection(selectedInspection);
    setShowInspectionStatusDialog(!showInspectionStatusDialog);
  };

  const listingInspectionCampaignsQuery = useQuery(
    queryGetListingInspectionCampaigns,
    {
      variables: { listingId },
      fetchPolicy: "cache-and-network"
    }
  );

  const listingInspectionDetailsQuery = useQuery(
    queryGetListingInspectionDetailsById,
    {
      variables: { listingId },
      fetchPolicy: "cache-and-network"
    }
  );

  const listingInspectionCampaigns =
    get(
      listingInspectionCampaignsQuery,
      "data.getListingInspectionCampaigns"
    ) || [];
  const listingInspectionDetails =
    get(
      listingInspectionDetailsQuery,
      "data.getListingDetailsById.inspections"
    ) || [];

  // Merge array of empty listing inspections and listing inspections that have data
  const inspections = listingInspectionDetails.map(x => ({
    ...listingInspectionCampaigns.find(y => y.inspectionId === x.inspectionId),
    ...x
  }));

  let content = null;
  if (
    listingInspectionDetailsQuery.loading ||
    listingInspectionCampaignsQuery.loading
  ) {
    content = <Loading />;
  } else if (
    listingInspectionDetailsQuery.error ||
    listingInspectionCampaigns.error
  ) {
    const message =
      (listingInspectionDetailsQuery.error &&
        listingInspectionDetailsQuery.error.message) ||
      (listingInspectionCampaignsQuery.error &&
        listingInspectionCampaignsQuery.error.message);
    content = <Error message={message} />;
  } else {
    content = (
      <React.Fragment>
        {/* Desktop inspection table - hides when viewport is lower than 960px wide */}
        <div className={classes.inspectionDesktop}>
          <div className={classes.inspectionsTableContainer}>
            <ListingInspectionTable
              disableActions={disableActions}
              listingId={listingId}
              toggleEditInspectionDialog={toggleEditInspectionDialog}
              toggleInspectionStatusDialog={toggleInspectionStatusDialog}
              inspections={inspections}
            />
          </div>
        </div>
        {/* Mobile timeline - shows when viewport is lower than 960px wide */}
        <div className={classes.inspectionMobile}>
          <ListingInspectionList
            inspections={inspections}
            toggleEditInspectionDialog={toggleEditInspectionDialog}
            toggleInspectionStatusDialog={toggleInspectionStatusDialog}
            disableActions={disableActions}
          />
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {content}
      {showEditInspectionDialog && (
        <EditInspectionDialog
          classes={classes}
          listingId={listingId}
          onClose={() => toggleEditInspectionDialog({})}
          selectedInspection={selectedInspection}
        />
      )}
      {showInspectionStatusDialog && (
        <InspectionStatusDialog
          classes={classes}
          listingId={listingId}
          onClose={() => toggleInspectionStatusDialog({})}
          selectedInspection={selectedInspection}
        />
      )}
    </React.Fragment>
  );
};

ListingInspections.propTypes = {
  classes: PropTypes.object,
  disableActions: PropTypes.bool,
  listingId: PropTypes.string
};

export default withStyles(styles)(ListingInspections);
