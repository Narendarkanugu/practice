import React, { Component } from "react";
import PropTypes from "prop-types";
import Auth0Lock from "auth0-lock";
import auth0 from "auth0-js";
import get from "lodash/get";
import gql from "graphql-tag";

import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import Loading from "../components/Loading";
import {
  LJH_ROLES,
  ROLE_UNKNOWN
} from "@clients-sites/ljh-platform/src/constants/index";

const auth0LockConfig = {
  allowSignUp: false,
  auth: {
    redirect: false,
    responseType: "token id_token",
    scope: "openid email profile"
  },
  closable: false,
  configurationBaseUrl: "https://cdn.auth0.com",
  theme: {
    logo:
      "https://assets.ljhooker.com/cache/1ca2e59ae1d0e94ca3b5a4ba04ce02234566060e.png",
    primaryColor: "#333"
  }
};

const officeDefaultProps = {
  officeCountry: "australia",
  officeType: "franchise",
  roleMaster: ""
};

const AuthContext = React.createContext({});

class AuthProvider extends Component {
  state = {
    accessToken: null,
    idToken: null,
    expiresAt: null,
    currentOffice: {},
    currentRegion: "",
    currentRole: "",
    currentServices: {},
    email: "",
    offices: [],
    services: [],
    personsCode: "",
    primaryOffice: {},
    realhubToken: ""
  };

  constructor(props) {
    super(props);
    this.initAuth0();
  }

  initAuth0 = () => {
    const { props } = this;
    const auth0ClientId = get(props, "config.auth0ClientId");
    const auth0Domain = get(props, "config.auth0Domain");
    const redirectUri = get(props, "config.redirectUri");

    this.auth0Client = new auth0.WebAuth({
      domain: auth0Domain,
      clientID: auth0ClientId,
      redirectUri: redirectUri,
      responseType: "token id_token",
      scope: "openid email profile"
    });

    this.auth0lock = new Auth0Lock(auth0ClientId, auth0Domain, auth0LockConfig);

    // Callback on successful initial authentication.
    this.auth0lock.on("authenticated", this.handleAuthentication);
    // Check if the user is already logged in and initialise session.
    this.auth0lock.checkSession({}, (err, authResult) => {
      // Handle error or new tokens
      if (err) {
        return this.login();
      }
      this.handleAuthentication(authResult);
    });
  };

  handleAuthentication = async authResult => {
    this.auth0lock.hide();
    this.setSession(authResult);

    const {
      idTokenPayload: {
        email,
        officeCode,
        officeName,
        personsCode,
        training_role
      }
    } = authResult;

    ljhAnalytics.identify(email, {
      agentId: personsCode,
      officeId: officeCode,
      officeName: officeName,
      role: training_role
    });

    await this.setAgentAuthData({
      email,
      officeCode,
      officeName,
      personsCode,
      training_role
    });
    await this.setAgentProfile(personsCode);
    this.setAgentServices();
  };

  setAgentAuthData = async authResult => {
    return this.setState({
      ...authResult,
      isAuthenticated: true
    });
  };

  setAgentProfile = async agentId => {
    let realhubToken;
    let offices;
    let primaryOffice;
    try {
      const result = await this.props.client.query({
        query: gql`
          {
            getMyAgentProfile {
              officePrimaryId
              offices {
                officeId
                officeCountry
                officeName
                officeType
                onboarding
                promoteV2Link
                role
                roleDisplay
                roleMaster
                tier
              }
            }
          }
        `,
        variables: {
          agentId
        },
        fetchPolicy: "network-only"
      });

      const {
        data: { getMyAgentProfile }
      } = result;

      realhubToken = getMyAgentProfile.realhubToken;
      offices = getMyAgentProfile.offices;

      if (offices && offices.length > 0) {
        primaryOffice = {
          ...officeDefaultProps,
          ...(offices.find(
            ({ officeId }) => officeId === getMyAgentProfile.officePrimaryId
          ) || offices[0])
        };
        primaryOffice.officeType =
          primaryOffice.officeType || officeDefaultProps.officeType;
      } else {
        primaryOffice = officeDefaultProps;
      }
    } catch (err) {
      realhubToken = "";
      offices = [];
      primaryOffice = officeDefaultProps;
    }

    const currentOffice = localStorage.getItem("selectedOfc")
      ? JSON.parse(localStorage.getItem("selectedOfc"))
      : primaryOffice;
    //const currentOffice = primaryOffice;
    const currentRole = this.getAgentRole(currentOffice.roleMaster);
    const currentRegion = currentOffice.officeCountry;

    return this.setState({
      realhubToken,
      offices,
      primaryOffice,
      currentOffice,
      currentRole,
      currentRegion
    });
  };

  getAgentRole = roleMaster => {
    if (!roleMaster) {
      return ROLE_UNKNOWN;
    }
    return roleMaster.toLowerCase().replace(" ", "-");
  };

  setAgentServices = () => {
    this.props.client
      .watchQuery({
        query: gql`
          {
            getMyServices {
              officeId
              sections {
                title
                items {
                  title
                  iconUrl
                  linkUrl
                  linkVariant
                }
              }
            }
          }
        `,
        fetchPolicy: "cache-and-network"
      })
      .subscribe(result => {
        let services = get(result, "data.getMyServices") || [];

        const currentServices = {
          ...(services.find(
            ({ officeId }) => officeId === this.state.currentOffice.officeId
          ) || services[0])
        };

        this.setState({
          services,
          currentServices
        });
      });
  };

  setCurrentOffice = office => {
    const { services } = this.state;
    const currentOffice = {
      ...office,
      officeType: office.officeType || officeDefaultProps.officeType
    };
    if (localStorage) {
      localStorage.setItem("selectedOfc", JSON.stringify(currentOffice));
    }
    const currentRole = LJH_ROLES[currentOffice.roleMaster.toLowerCase()];
    const currentRegion = currentOffice.officeCountry;

    const currentServices = {
      ...(services.find(
        ({ officeId }) => officeId === currentOffice.officeId
      ) || services[0])
    };

    this.setState({
      currentOffice,
      currentRegion,
      currentRole,
      currentServices
    });
  };

  setSession = authResult => {
    if (localStorage) {
      localStorage.setItem("id_token", authResult.idToken);
    }
  };

  clearSession = () => {
    if (localStorage) {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("selectedOfc");
    }
  };

  login = () => {
    localStorage.removeItem("loggingout");
    this.auth0lock.show({
      languageDictionary: {
        title: "Platform"
      }
    });
  };

  logout = () => {
    this.clearSession();
    this.setState(() => ({
      idToken: null,
      expiresAt: null
    }));
    localStorage.setItem("loggingout", true);
    this.auth0Client.logout();
  };

  render() {
    const { children } = this.props;
    const {
      currentOffice,
      currentRole,
      currentServices,
      currentRegion,
      email,
      offices,
      personsCode,
      primaryOffice,
      realhubToken,
      isAuthenticated
    } = this.state;

    if (!isAuthenticated) {
      if (localStorage.getItem("id_token")) {
        return <Loading />;

      } else if (localStorage.getItem("loggingout")) {
        return <Loading text="Logging you out..." />;
      } else {
        return <Loading text="Loading..." />;
      }
    }
    else {
      return (
        <AuthContext.Provider
          value={{
            currentOffice,
            currentRole,
            currentServices,
            email,
            logout: this.logout,
            offices,
            personsCode,
            primaryOffice,
            realhubToken,
            currentRegion,
            setCurrentOffice: this.setCurrentOffice
          }}
        >
          {children}
        </AuthContext.Provider>
      );
    }
  }
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  config: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    clientID: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired,
    channel: PropTypes.string.isRequired
  }).isRequired
};

export { AuthProvider };
export default AuthContext;
