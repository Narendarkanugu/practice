import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorBoundary from "../components/ErrorBoundary";

const App = ({ routes, version, ...authProps }) => {
  return (
    <div>
      <CssBaseline />
      <div>
        <div>
          <Header
            links={routes.map(({ name, path, exact, badgeContent }) => ({
              name,
              to: path,
              exact,
              badgeContent
            }))}
            {...authProps}
          />
        </div>
        <div>
          <ErrorBoundary>
            <Switch>
              {routes.map(({ component, exact, path }) => (
                <Route path={path} component={component} exact={exact} key={path} />
              ))
              }
              <Redirect from="/staff" to="/" />
              <Route component={routes.length > 0 ? routes[0].component : ""} />
            </Switch>
          </ErrorBoundary>
        </div>
        <div>
          <Footer version={version} />
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  routes: PropTypes.array
};

App.defaultProps = {
  routes: []
};

export default App;
