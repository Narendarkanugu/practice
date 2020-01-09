import React, { useState, useContext } from "react";
import { useQuery } from "react-apollo-hooks";
import PropTypes from "prop-types";
import { Add } from "@material-ui/icons";
import { Fab, Grid, Typography, Select, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { size, capitalize, get, find } from "lodash";

import queryGetListingTimelineForAgent from "../../graphql/queryGetListingTimelineForAgent";
// import { usePageViewTracker } from "../../../../hooks/analytics";
import CreatePostDialog from "./CreatePostDialog";
import Error from "@clients-modules/react/lib/components/Error";
import Loading from "@clients-modules/react/lib/components/Loading";
import StatusTimeline from "./StatusTimeline";
import TimelineCards from "./TimelineCards";
import ActionsContext from "./../../../../contexts/ActionsContext"

import styles from "./styles";
import { GET_DOCUMENTS } from "../../graphql/document";

const timelineStatus = {
  pending: "pending",
  hidden: "hidden",
  published: "published"
};

const ListingTimeline = ({ classes, disableActions, listingId }) => {
  // usePageViewTracker("listings/timeline");

  const { setComponent } = useContext(ActionsContext);
  setComponent("timelineListing");

  const [showCreatePostDialog, setCreatePostDialog] = useState(false);
  const [selectedStatusMobile, setSelectedStatusMobile] = useState(
    timelineStatus.pending
  );

  const { data, error, loading } = useQuery(queryGetListingTimelineForAgent, {
    variables: { listingId },
    fetchPolicy: "network-only"
  });

  const { data: _getDocuments, loading: loadingDocuments } = useQuery(GET_DOCUMENTS, {
    variables: { listingId },
    fetchPolicy: "cache-and-network"
  });
  const documents = get(_getDocuments, "documents", []) || [];

  const isDocumentPublished = docId => {
    const doc = find(documents, d => d.documentId === docId)
    return doc ? doc.published : null
  }

  const toggleCreatePostDialog = postCreated => {
    setCreatePostDialog(!showCreatePostDialog);

    // Update status view on mobile if post was successfully created
    if (postCreated) {
      setSelectedStatusMobile("published");
    }
  };

  const handleStatusMobileSelect = e => {
    setSelectedStatusMobile(e.target.value);
  };

  const getCardsByStatus = cards => {
    const pending = [];
    const published = [];
    const hidden = [];

    cards.forEach(x => {
      switch (x.status) {
        case "pending":
          pending.push(x);
          break;
        case "published":
          published.push(x);
          break;
        case "hidden":
          hidden.push(x);
          break;
        default:
          break;
      }
    });

    return {
      pending,
      published,
      hidden
    };
  };

  if (loading && loadingDocuments) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {

    const cards = get(data.getListingTimelineForAgent, "cards", []) || [];

    const cardsByStatus = getCardsByStatus(cards);

    return (
      <div className={classes.vendorTimelineContainer}>
        <div className={classes.actionHeading}>
          <Grid
            alignItems="center"
            justify="space-between"
            container
            spacing={2}
          >
            <Grid item>
              <Typography variant="h6">Vendor timeline</Typography>
            </Grid>
            <Grid item>
              <Fab
                size="small"
                onClick={() => toggleCreatePostDialog()}
                disabled={disableActions}
              >
                <Add />
              </Fab>
            </Grid>
          </Grid>
        </div>

        {/* Desktop timeline - hides when viewport is lower than 960px wide */}
        <div className={classes.desktopTimeline}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StatusTimeline
                defaultExpanded
                expandable
                cards={cardsByStatus.pending}
                status="Pending"
                isDocumentPublished={isDocumentPublished}
              />
              {size(cardsByStatus.hidden) > 0 && (
                <StatusTimeline
                  expandable
                  cards={cardsByStatus.hidden}
                  status="Hidden"
                  isDocumentPublished={isDocumentPublished}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <StatusTimeline
                defaultExpanded
                expandable={false}
                cards={cardsByStatus.published}
                status="Published"
                isDocumentPublished={isDocumentPublished}
              />
            </Grid>
          </Grid>
        </div>

        {/* Mobile timeline - shows when viewport is lower than 960px wide */}
        <div className={classes.mobileTimeline}>
          <Select
            className={classes.statusSelect}
            value={selectedStatusMobile}
            onChange={handleStatusMobileSelect}
          >
            {Object.keys(timelineStatus).map(key => (
              <MenuItem key={key} value={key}>
                {capitalize(timelineStatus[key])}
              </MenuItem>
            ))}
          </Select>
          <TimelineCards
            cards={cardsByStatus[selectedStatusMobile]}
            status={selectedStatusMobile}
            isDocumentPublished={isDocumentPublished}
          />
        </div>

        {showCreatePostDialog && (
          <CreatePostDialog
            listingId={listingId}
            onClose={postCreated => toggleCreatePostDialog(postCreated)}
          />
        )}
      </div>
    );
  }
};

ListingTimeline.propTypes = {
  classes: PropTypes.object,
  disableActions: PropTypes.bool,
  listingId: PropTypes.string.isRequired,
  tabParams: PropTypes.object
};

export default withStyles(styles)(ListingTimeline);
