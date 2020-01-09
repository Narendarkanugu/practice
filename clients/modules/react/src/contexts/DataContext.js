import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import AWSAppSyncClient, { createAppSyncLink } from "aws-appsync";
import uuidv4 from "uuid/v4";

const appSyncClient = ({
  url,
  region = "ap-southeast-2",
  auth = {
    type: "OPENID_CONNECT",
    jwtToken: async () => localStorage.getItem("id_token")
  }
}) =>
  new AWSAppSyncClient(
    { url, region, auth },
    {
      link: createAppSyncLink({
        ...{ url, region, auth },
        resultsFetcherLink: ApolloLink.from([
          setContext((_, previousContext) => ({
            headers: {
              ...previousContext.headers,
              "X-Request-ID": uuidv4()
            }
          })),
          createHttpLink({
            uri: url
          })
        ])
      })
    }
  );

const DataContext = React.createContext({});

const DataProvider = ({ children, url }) => {
  const client = appSyncClient({ url });

  return (
    <DataContext.Provider value={{ client }}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
      </ApolloProvider>
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default DataContext;
export { DataProvider };
