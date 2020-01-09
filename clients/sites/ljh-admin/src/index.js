import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import AuthContext, {
  AuthProvider
} from "@clients-modules/react/lib/contexts/AuthContext";
import DataContext, {
  DataProvider
} from "@clients-modules/react/lib/contexts/DataContext";
import App from "@clients-modules/react/lib/containers/App";

import Services from "./pages/Services";

import theme from "./theme";
import config from "./config";

const muiTheme = theme();

// React router config
const routes = [
  { name: "Services", path: "/", component: Services, exact: true }
];

ReactDOM.render(
  <DataProvider url={`${config.baseApiGateway}/graphql`}>
    <DataContext.Consumer>
      {({ client }) => (
        <MuiThemeProvider theme={muiTheme}>
          <AuthProvider client={client} config={config}>
            <HashRouter basename="/">
              <AuthContext.Consumer>
                {authProps => (
                  <App
                    routes={routes}
                    authProps={authProps}
                    version={config.version}
                  />
                )}
              </AuthContext.Consumer>
            </HashRouter>
          </AuthProvider>
        </MuiThemeProvider>
      )}
    </DataContext.Consumer>
  </DataProvider>,
  document.getElementById("root")
);
