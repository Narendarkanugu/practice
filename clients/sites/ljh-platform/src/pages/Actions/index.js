import React, { useContext, useState } from "react";
import PageContainer from "@clients-modules/react/lib/components/PageContainer";
import Loading from "@clients-modules/react/lib/components/Loading";
import ActionsError from "./components/ActionsError";
import ActionsLayout from "./components/ActionsLayout";
import ActionsNotFound from "./components/ActionsNotFound";
import ActionsContext from "../../contexts/ActionsContext";
import ListingsContext from "../../contexts/ListingsContext";
import { usePageViewTracker } from "@clients-modules/react/lib/hooks/analytics";
import { Grid, Typography } from "@material-ui/core";
import Fuse from "fuse.js";
import { isEmpty } from "lodash";
import ListingFilter from "../Listings/components/ListingFilter";
import withStyles from "@material-ui/core/styles/withStyles";
import StatusFilterComponent from "./components/StatusFilterComponent";
import styles from "./styles";

const Actions = ({ classes }) => {
  usePageViewTracker("actions");

  const listingStatuses = [
    "Listed",
    "Settled",
    "Conditional",
    "Unconditional",
    "Commenced"
  ];

  const filterOptions = {
    // Determines which property to match on
    keys: ["sortKey"],
    // Determines how perfect a match should be (0.0 = perfect)
    threshold: 0.3
  };
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [addressFilter, setAddressFilter] = useState("");
  const { loading, error, listings } = useContext(ListingsContext);
  const {
    getActionCardsByListingId,
    getActionCardCountByListingId
  } = useContext(ActionsContext);

  const getStatus = list => {
    setSelectedItems([...list]);
  };
  const getFilteredListings = (filter, listings) => {
    const fuse = new Fuse(listings, filterOptions);
    return fuse.search(filter);
  };

  let listContent = null;
  let filteredListings = listings;
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

  if (loading) {
    listContent = <Loading />;
  } else if (error) {
    listContent = <ActionsError message={error.message} />;
  } else if (isEmpty(listings)) {
    listContent = <ActionsNotFound />;
  } else {
    listContent = (
      <div>
        <ActionsLayout
          getActionCardsByListingId={getActionCardsByListingId}
          getActionCardCountByListingId={getActionCardCountByListingId}
          listings={filteredListings}
        />
      </div>
    );
  }
  return (
    <PageContainer className={classes.gridContainer}>
      <Grid alignItems="center" container>
        <Grid item xs={12} md={9}>
          <Typography component="h1" variant="h4">
            Actions
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
        statusesInfo="Showing actions of listing status :"
      ></StatusFilterComponent>
      <div>{listContent}</div>
    </PageContainer>
  );
};

export default withStyles(styles)(Actions);
