import React, { useContext } from "react";
import isEmpty from "lodash/isEmpty";

import AuthContext from "@clients-modules/react/lib/contexts/AuthContext";
import PageContainer from "@clients-modules/react/lib/components/PageContainer";
import Loading from "@clients-modules/react/lib/components/Loading";

import ListingError from "./components/ListingError";
import ListingNotFound from "./components/ListingNotFound";
import ListingLayout from "./components/ListingLayout";

import ListingsContext from "../../contexts/ListingsContext";
import ActionsContext from "../../contexts/ActionsContext";

const Listings = () => {
  const { listings, error, loading } = useContext(ListingsContext);
  const {
    getActionCardsByListingId,
    getActionCardCountByListingId
  } = useContext(ActionsContext);
  const { currentRole, currentOffice } = useContext(AuthContext);

  let listContent = null;

  if (loading) {
    listContent = <Loading />;
  } else if (error) {
    listContent = <ListingError message={error.message} />;
  } else if (isEmpty(listings)) {
    listContent = <ListingNotFound />;
  } else {
    listContent = (
      <ListingLayout
        getActionCards={getActionCardsByListingId}
        getActionCardCount={getActionCardCountByListingId}
        listings={listings}
        currentOffice={currentOffice}
        currentRole={currentRole}
      />
    );
  }

  return <PageContainer>{listContent}</PageContainer>;
};

export default Listings;
