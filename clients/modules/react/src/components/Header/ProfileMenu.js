import React from "react";
import PropTypes from "prop-types";

import { Button, ListItemText, Menu, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Icon from "../Icon";

import styles from "./styles";

const ProfileMenu = ({
  classes,
  currentOffice,
  logout,
  offices,
  setCurrentOffice
}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        aria-owns={anchorEl ? "profile-menu" : undefined}
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <span className={classes.profileIcon}>
          <Icon iconName="user-circle" />
        </span>
        <span className={classes.officeName}>{currentOffice.officeName}</span>
        <span className={classes.officeSwitcherIcon}>
          <Icon iconName="angle-down" iconSize={18} />
        </span>
      </Button>
      <Menu
        id="profile-menu"
        classes={{
          paper: classes.profileMenu
        }}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* 
          This next line is a workaround for an issue with the first item always being stuck on a hover state
          https://github.com/mui-org/material-ui/issues/5186#issuecomment-337278330
        */}
        <MenuItem key="placeholder" style={{ display: "none" }} />
        {offices &&
          offices.map(office => (
            <MenuItem
              onClick={() => {
                setCurrentOffice(office);
                handleClose();
              }}
              key={office.officeName}
              selected={office.officeId === currentOffice.officeId}
            >
              <ListItemText primary={office.officeName} />
            </MenuItem>
          ))}
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  classes: PropTypes.object,
  currentOffice: PropTypes.object,
  logout: PropTypes.func,
  offices: PropTypes.array,
  setCurrentOffice: PropTypes.func
};

export default withStyles(styles)(ProfileMenu);
