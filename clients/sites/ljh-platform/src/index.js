import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AuthContext, {
  AuthProvider
} from "@clients-modules/react/lib/contexts/AuthContext";
import DataContext, {
  DataProvider
} from "@clients-modules/react/lib/contexts/DataContext";
import App from "@clients-modules/react/lib/containers/App";
import EmptyState from "@clients-modules/react/lib/components/EmptyState";
import PageContainer from "@clients-modules/react/lib/components/PageContainer";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import Actions from "./pages/Actions";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Services from "./pages/Services";
import { unregister } from "./registerServiceWorker";
import Staff from "./pages/Staff";

import ActionsContext, {
  ActionsContextProvider
} from "./contexts/ActionsContext";
import { ListingsContextProvider } from "./contexts/ListingsContext";
import { StaffContextProvider } from "./contexts/StaffContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";

import theme from "./theme";
import config from "./config";
import { ROLE_UNKNOWN } from "@clients-sites/ljh-platform/src/constants/index";

const muiTheme = theme();

const ListingDetailRouter = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/:tab`} component={ListingDetail} />
      <Redirect exact from={match.path} to={`${match.path}/timeline`} />
    </Switch>
  );
};
const ListingsRouter = ({ match }) => {
  return (
    <React.Fragment>
      <Route exact path={match.path} component={Listings} />
      <Route
        path={`${match.path}/:listingId`}
        component={ListingDetailRouter}
      />
    </React.Fragment>
  );
};

const RoleEmpty = () => {
  const { currentOffice } = useContext(AuthContext);
  return (
    <PageContainer title="Something went wrong">
      <EmptyState
        iconName="exclamation-circle"
        content={[
          <Typography key={`${currentOffice.officeName}-no-role-${0}`}>
            {`We are unable to detect your role for ${currentOffice.officeName}, `}
            please contact support at&nbsp;
            <Link
              href="mailto:support@ljhooker.com?Subject=Platform%20Support%20Request:%20Role%20Undetected"
              target="_top"
            >
              support@ljhooker.com to have this resolved.
            </Link>
          </Typography>
        ]}
      />
    </PageContainer>
  );
};
ReactDOM.render(
  <DataProvider url={`${config.appsyncUrl}/graphql`}>
    <DataContext.Consumer>
      {({ client }) => (
        <MuiThemeProvider theme={muiTheme}>
          <AuthProvider client={client} config={config}>
            <ActionsContextProvider>
              <ListingsContextProvider>
                <NotificationContextProvider>
                  <StaffContextProvider>
                    <HashRouter basename="/">
                      <ActionsContext.Consumer>
                        {({ actionCardCount }) => (
                          <AuthContext.Consumer>
                            {authProps => {
                              var authorizedRoles = [
                                "administration",
                                "franchise-owner"
                              ];
                              var routesArray = [];
                              if (authProps.currentRole === ROLE_UNKNOWN) {
                                routesArray = [
                                  {
                                    name: "_",
                                    path: "/",
                                    component: RoleEmpty,
                                    exact: true
                                  }
                                ];
                              } else {
                                const isNZOffice =
                                  authProps.currentRegion === "new zealand";
                                const isAusOffice =
                                  authProps.currentRegion === "australia";
                                if (isNZOffice) {
                                  routesArray = [
                                    {
                                      name: "Services",
                                      path: "/",
                                      component: Services,
                                      exact: true
                                    }
                                  ];
                                } else if (isAusOffice) {
                                  routesArray = [
                                    {
                                      name: "Actions",
                                      path: "/",
                                      component: Actions,
                                      exact: true,
                                      badgeContent: actionCardCount
                                    },
                                    {
                                      name: "Listings",
                                      path: "/listings",
                                      component: ListingsRouter
                                    },
                                    {
                                      name: "Services",
                                      path: "/services",
                                      component: Services
                                    }
                                  ];
                                }
                                if (
                                  authorizedRoles.indexOf(
                                    authProps.currentRole
                                  ) > -1
                                ) {
                                  routesArray.push({
                                    name: "Staff",
                                    path: "/staff",
                                    component: Staff
                                  });
                                }
                              }
                              return (
                                <App
                                  routes={routesArray}
                                  version={config.version}
                                  {...authProps}
                                />
                              );
                            }}
                          </AuthContext.Consumer>
                        )}
                      </ActionsContext.Consumer>
                    </HashRouter>
                  </StaffContextProvider>
                </NotificationContextProvider>
              </ListingsContextProvider>
            </ActionsContextProvider>
          </AuthProvider>
        </MuiThemeProvider>
      )}
    </DataContext.Consumer>
  </DataProvider>,
  document.getElementById("root")
);

// Unregister service worker.
unregister();
