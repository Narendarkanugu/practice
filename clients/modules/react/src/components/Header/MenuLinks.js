import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles"

const MenuLinks = ({
    classes,
    links,
    clsName,
    hamHandler
}) => {
    return (
        <React.Fragment>
            {links.length >= 1 &&
                links.map(({ name, to = "/", exact = false, badgeContent }) => (
                    <RouterLink
                        key={name}
                        to={to}
                        exact={exact}
                        className={clsName ? classes.pageLinkContainerMobile : classes.pageLinkContainer}
                        onClick={hamHandler ? hamHandler : () => { }}
                    >
                        {badgeContent ? (

                            <Typography
                                variant="subtitle1"
                                className={classes.pageLink}
                            >
                                {name}
                                <Badge
                                    color="secondary"
                                    classes={{ badge: classes.listingsBadge }}
                                    badgeContent={badgeContent}
                                ><span></span></Badge>
                            </Typography>

                        ) : (
                                <Typography variant="subtitle1" className={classes.pageLink}>
                                    {name}
                                </Typography>
                            )}
                    </RouterLink>
                ))}
        </React.Fragment>
    );
};
MenuLinks.propTypes = {
    classes: PropTypes.object,
    links: PropTypes.array,
    clsName: PropTypes.string,
    hamHandler: PropTypes.func
};

MenuLinks.defaultProps = {
    links: []
};

export default withStyles(styles)(MenuLinks);