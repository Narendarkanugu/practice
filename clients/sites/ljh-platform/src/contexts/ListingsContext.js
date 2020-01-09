import React from "react";
import { useQuery } from "react-apollo-hooks";

import queryGetListings from "../graphql/queryGetListings";

const ListingsContext = React.createContext({});

const ListingsContextProvider = ({ children }) => {
  const { data, error, loading } = useQuery(queryGetListings, {
    fetchPolicy: "cache-and-network"
  });

  const { getListings: listings } = data;

  const getListingById = listingId => {
    if (loading || error) {
      return null;
    }
    return listings.find(x => x.listingId === listingId);
  };

  return (
    <ListingsContext.Provider
      value={{
        error,
        getListingById,
        count: listings ? listings.length : 0,
        listings,
        loading
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsContext;
export { ListingsContextProvider };
