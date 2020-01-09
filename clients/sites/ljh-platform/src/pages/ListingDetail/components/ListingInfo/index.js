import React from "react";
import { graphql } from "react-apollo";
import flowRight from "lodash/flowRight";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import size from "lodash/size";

import ListingShare from "./ListingShare";
import ListingVendors from "./ListingVendors";
import ListingVendorRemove from "./ListingVenderRemove";
import ListingWebsites from "./ListingWebsites";
import ListingAgents from "./ListingAgents";

import Error from "@clients-modules/react/lib/components/Error";
import Loading from "@clients-modules/react/lib/components/Loading";

import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import queryGetListingDetailsById from "../../graphql/queryGetListingDetailsById";
import { DEFAULT_LISTING_IMAGE } from "../../../../constants";

import styles from "./styles";

class ListingInfo extends React.Component {
  state = {
    showShareWithDialog: false,
    showVendorRemoveDialog: false,
    vendorEmailToRemove: ""
  };

  componentDidMount() {
    ljhAnalytics.page("listings/listing");
  }

  handleVendorRemoveDialogOpen = vendorEmailToRemove => {
    this.setState({ showVendorRemoveDialog: true, vendorEmailToRemove });
  };

  handleVendorRemoveDialogClose = () => {
    this.setState({ showVendorRemoveDialog: false, vendorEmailToRemove: "" });
  };

  handleShareWithDialogOpen = () => {
    this.setState({ showShareWithDialog: true });
  };

  handleShareWithDialogClose = () => {
    this.setState({ showShareWithDialog: false });
  };

  renderListingDetails = () => {
    const {
      classes,
      listingId,
      listingDetails: { loading, error, data },
      disableActions
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error message={error.message} />;
    }

    if (data) {
      const { vendors, websites, agents } = data;

      return (
        <React.Fragment>
          <ListingVendors
            vendors={vendors}
            disableActions={disableActions}
            onRemoveVendor={this.handleVendorRemoveDialogOpen}
          />
          <div className={classes.vendorListFooter}>
            <Divider />
            <Button
              disabled={disableActions}
              color="secondary"
              size="large"
              onClick={this.handleShareWithDialogOpen}
            >
              Share with vendor
            </Button>
          </div>
          {size(agents) > 0 && <ListingAgents agents={agents} />}
          {size(websites) > 0 && <ListingWebsites websites={websites} />}
          {this.state.showShareWithDialog && (
            <ListingShare
              listingId={listingId}
              handleClose={this.handleShareWithDialogClose}
              vendors={vendors}
            />
          )}
          <ListingVendorRemove
            show={this.state.showVendorRemoveDialog}
            listingId={listingId}
            handleClose={this.handleVendorRemoveDialogClose}
            email={this.state.vendorEmailToRemove}
          />
        </React.Fragment>
      );
    }

    return null;
  };

  render() {
    const {
      advertHeadingText,
      classes,
      listedDate,
      photoPrimaryUrl,
      priceDisplay,
      propertyAddress: { state, street, suburb },
      statusText
    } = this.props;

    return (
      <div className={classes.listingInfo}>
        <div
          className={classes.listingPhoto}
          style={{
            backgroundImage: `url(${photoPrimaryUrl || DEFAULT_LISTING_IMAGE})`
          }}
        />
        <Grid
          className={classes.listingTitleContainer}
          container
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5">{advertHeadingText}</Typography>
            <Typography
              component="p"
              color="textSecondary"
            >{`${street} ${suburb}, ${state}`}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={classes.listingStatus} variant="h6">
              {priceDisplay}
            </Typography>
            <Typography
              className={classes.listingStatus}
              component="p"
              color="textSecondary"
            >{`${statusText} on ${listedDate}`}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <div className={classes.listingDetailContainer}>
          {this.renderListingDetails()}
        </div>
      </div>
    );
  }
}

const graphqlQueryGetListingDetailsById = graphql(queryGetListingDetailsById, {
  name: "listingDetails",
  options: ({ listingId }) => {
    return {
      fetchPolicy: "cache-and-network",
      variables: { listingId }
    };
  },
  props: ({ listingDetails }) => ({
    listingDetails: {
      data:
        listingDetails.loading && listingDetails.networkStatus === 1
          ? {}
          : listingDetails.getListingDetailsById,
      error: listingDetails.error,
      loading: listingDetails.loading && listingDetails.networkStatus === 1
    }
  })
});

export default flowRight(graphqlQueryGetListingDetailsById)(
  withStyles(styles)(ListingInfo)
);
