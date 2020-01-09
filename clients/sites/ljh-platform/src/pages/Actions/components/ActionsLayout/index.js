import React, { useContext } from "react";
import { Grid, Grow, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { isEmpty, size } from "lodash";
import Loading from "@clients-modules/react/lib/components/Loading";
import { DEMO_LISTING, DEFAULT_LISTING_IMAGE } from "../../../../constants";

import PropertyCard from "../../../../components/PropertyCard";
import ActionsNotFound from "../ActionsNotFound";
import ActionsContext from "../../../../contexts/ActionsContext"

import styles from "./styles";

const ActionsLayout = ({
  classes,
  getActionCardCountByListingId,
  getActionCardsByListingId,
  listings
}) => {

  const { setComponent } = useContext(ActionsContext);
  setComponent("actions");

  if (!listings) return null;

  let listingsWithActions;

  listingsWithActions = [];

  listings.forEach(x => {
    if (getActionCardCountByListingId(x.listingId) > 0) {
      listingsWithActions.push(x);
    } else if (getActionCardCountByListingId(x.listingId) === -1) {
      listingsWithActions[0] = "Loading"
    }
  });
  return (
    <Grid container direction="column" spacing={1}>
      <div>
        {!isEmpty(listingsWithActions) ? listingsWithActions[0] === "Loading" ? (<Loading />) : (
          <div>
            <Typography
              className={classes.subHeading}
              component="h2"
              variant="h5"
            >
              Outstanding actions for all offices
            </Typography>
            {renderGrid(
              classes,
              getActionCardCountByListingId,
              getActionCardsByListingId,
              listingsWithActions
            )}
          </div>
        ) : (
            <ActionsNotFound />
          )}
      </div>
    </Grid>
  );
};

const hasNoResidentialProperties = listings => {
  if (size(listings) === 1) {
    return listings[0].listingId === DEMO_LISTING;
  }
  return false;
};

const renderGrid = (
  classes,
  getActionCardCountByListingId,
  getListingActionCards,
  listings
) => {
  return (
    <Grid container className={classes.cardsGrid} spacing={4}>
      {listings.map(x => (
        <Grid className={classes.listingItem} key={x.listingId} item>
          {renderListing(
            classes,
            getActionCardCountByListingId,
            getListingActionCards,
            x
          )}
        </Grid>
      ))}
      {hasNoResidentialProperties(listings) && (
        <div className={classes.listingNotFoundContainer}>
          <ActionsNotFound className={classes.listingNotFound} />
        </div>
      )}
    </Grid>
  );
};

const renderListing = (
  classes,
  getActionCardCountByListingId,
  getListingActionCards,
  listing
) => {
  var actions = getListingActionCards(listing.listingId);
  actions = actions.filter(
    action => action.hideable && action.status === "pending"
  );
  return (
    actions.length > 0 && (
      <Grow in={true}>
        <Grid className={classes.listingItem} item key={listing.listingId}>
          <PropertyCard
            // actionCount={getActionCardCountByListingId(listing.listingId)}
            actionCount={actions.length}
            actions={actions}
            addressState={listing.propertyAddress.state}
            addressStreet={listing.propertyAddress.street}
            addressSuburb={listing.propertyAddress.suburb}
            description={listing.advertHeadingText}
            imageUrl={listing.photoPrimaryUrl || DEFAULT_LISTING_IMAGE}
            listingId={listing.listingId}
            status={listing.statusText}
            price={listing.priceDisplay}
            date={listing.listedDate}
            documents={listing.documents}
          />
        </Grid>
      </Grow>
    )
  );
};

export default withStyles(styles)(ActionsLayout);
