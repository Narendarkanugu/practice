import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuLinks from "./MenuLinks";



const Hamburger = ({
    classes,
    links
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    var handleClick = function handleClick(event) {
        setAnchorEl(anchorEl ? false : true);
    }

    var handleClose = function handleClose() {
        setAnchorEl(null);
    }
    return (
        <div>
            <MenuIcon className={classes.menuIcon} onClick={handleClick} />
            <div id="hamburgerMenu" className={classes.HamburgerMenuSection} style={{ display: Boolean(anchorEl) ? "block" : "none" }} onClick={handleClose}>
                <MenuLinks links={links} clsName="0" hamHandler={handleClose} />
            </div>
        </div>
    );
};
Hamburger.propTypes = {
    classes: PropTypes.object,
    links: PropTypes.array,
};

Hamburger.defaultProps = {
    links: []
};

export default withStyles(styles)(Hamburger);