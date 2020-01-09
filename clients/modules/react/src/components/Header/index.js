import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import ProfileMenu from "./ProfileMenu";
import PropTypes from "prop-types";
import styles from "./styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Hamburger from "./Hamburger";
import MenuLinks from "./MenuLinks";

const Header = ({
  classes,
  currentOffice,
  links,
  logout,
  offices,
  setCurrentOffice
}) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Hamburger
            links={links}
          />
          <RouterLink to="/" exact={true} className={classes.titleLogo}>
            <img
              alt="LJ Hooker"
              className={classes.titleLogoImage}
              src="https://assets.ljhooker.com/cache/48fd4b3ac18058bdc6db3233789a5d472c8e1ebe.svg"
              title="LJ Hooker"
            />
          </RouterLink>
          <MenuLinks links={links} />

          <div className={classes.grow} />
          <ProfileMenu
            currentOffice={currentOffice}
            logout={logout}
            offices={offices}
            setCurrentOffice={setCurrentOffice}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  currentOffice: PropTypes.object,
  listingActionCardCount: PropTypes.number,
  logout: PropTypes.func,
  offices: PropTypes.array,
  setCurrentOffice: PropTypes.func
};

Header.defaultProps = {
  classes: {},
  currentOffice: {},
  links: [],
  logout: () => { },
  offices: [],
  setCurrentOffice: () => { }
};

export default withStyles(styles)(Header);
