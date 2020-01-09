import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { isEmpty, size } from "lodash";
import Fuse from "fuse.js";

import EmptyState from "@clients-modules/react/lib/components/EmptyState";

import { DEMO_LISTING, DEFAULT_LISTING_IMAGE } from "../../../../constants";
import PropertyCard from "../../../../components/PropertyCard";
import ListingFilter from "../ListingFilter";
import ListingNotFound from "../ListingNotFound";

import styles from "./styles";
import StatusFilterComponent from "../../../Actions/components/StatusFilterComponent";

const filterOptions = {
  // Determines which property to match on
  keys: ["sortKey"],
  // Determines how perfect a match should be (0.0 = perfect)
  threshold: 0.3
};

const ListingLayout = ({
  classes,
  currentOffice,
  currentRole,
  getActionCardCount = 0,
  getActionCards = [],
  listings
}) => {
  const getFilteredListings = (filter, listings) => {
    const fuse = new Fuse(listings, filterOptions);
    return fuse.search(filter);
  };

  const hasNoResidentialProperties = listings => {
    if (size(listings) === 1) {
      return listings[0].listingId === DEMO_LISTING;
    }
    return false;
  };

  const [selectedItems, setSelectedItems] = React.useState([]);
  const listingStatuses = [
    "Listed",
    "Settled",
    "Conditional",
    "Unconditional",
    "Commenced"
  ];

  const getStatus = list => {
    setSelectedItems([...list]);
  };

  const renderListing = listing => {
    const actions = getActionCards(listing.listingId);
    var pendingActionsCount = 0;
    if (actions != null && actions != -1)
      pendingActionsCount = actions.filter(
        action => action.hideable && action.status === "pending"
      );

    return (
      <Grow in={true}>
        <Grid item key={listing.listingId}>
          <PropertyCard
            // actionCount={getActionCardCount(listing.listingId)}
            actionCount={pendingActionsCount.length}
            actions={actions}
            addressState={listing.propertyAddress.state}
            addressStreet={listing.propertyAddress.street}
            addressSuburb={listing.propertyAddress.suburb}
            description={listing.advertHeadingText}
            hideAction
            imageUrl={listing.photoPrimaryUrl || DEFAULT_LISTING_IMAGE}
            listingId={listing.listingId}
            status={listing.statusText}
            price={listing.priceDisplay}
            date={listing.listedDate}
            documents={listing.documents}
          />
        </Grid>
      </Grow>
    );
  };

  const renderNoMatches = filter => {
    return (
      <Grid container spacing={4}>
        <Grid item>
          {filter ? (
            <EmptyState
              title={`No matches for "${filter}"`}
              iconName="search"
            />
          ) : (
              <EmptyState title={`No matches found`} iconName="search" />
            )}
        </Grid>
      </Grid>
    );
  };

  const renderGrid = listings => {
    return (
      <Grid className={classes.listingGrid} container spacing={4}>
        {listings.map(x => (
          <Grid className={classes.listingItem} key={x.listingId} item>
            {renderListing(x)}
          </Grid>
        ))}
        {hasNoResidentialProperties(listings) && (
          <Grid className={classes.listingItem} item>
            <div className={classes.listingNotFoundContainer}>
              <ListingNotFound
                className={classes.listingNotFound}
                current
                currentRole={currentRole}
              />
            </div>
          </Grid>
        )}
      </Grid>
    );
  };

  const [addressFilter, setAddressFilter] = useState("");

  if (!listings) return null;

  let listingsForCurrentOffice = listings.filter(
    listing =>
      listing.officeId === currentOffice.officeId ||
      listing.listingId === DEMO_LISTING
  );

  let filteredListings = listingsForCurrentOffice;
  let filterStatusAry;
  if (addressFilter || selectedItems.length) {
    filterStatusAry = selectedItems.map(sitem => sitem.toLowerCase());
    if (addressFilter) {
      filteredListings = getFilteredListings(addressFilter, listings);
      if (selectedItems.length > 0) {
        filteredListings = filteredListings.filter(
          listingObj => filterStatusAry.indexOf(listingObj.status) > -1
        );
      }
    } else {
      if (selectedItems.length > 0) {
        filteredListings = listings.filter(
          listingObj => filterStatusAry.indexOf(listingObj.status) > -1
        );
      }
    }
  }

  return (
    <div className={classes.gridContainer}>
      <Grid container spacing={2}>
        <Grid alignItems="center" container>
          <Grid item xs={12} md={9}>
            <Typography component="h1" variant="h4">
              My Listings
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <ListingFilter
              value={addressFilter}
              onChange={e => setAddressFilter(e.target.value)}
              clear={() => setAddressFilter("")}
            />
          </Grid>
        </Grid>

        <StatusFilterComponent
          listingStatuses={listingStatuses}
          getStatus={getStatus}
          statusesInfo={"Showing listings of status :"}
        ></StatusFilterComponent>

        {filteredListings ? (
          !isEmpty(filteredListings) ? (
            renderGrid(filteredListings)
          ) : (
              renderNoMatches(addressFilter)
            )
        ) : (
            <div>
              {!isEmpty(listingsForCurrentOffice) &&
                renderGrid(listingsForCurrentOffice)}
            </div>
          )}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ListingLayout);
