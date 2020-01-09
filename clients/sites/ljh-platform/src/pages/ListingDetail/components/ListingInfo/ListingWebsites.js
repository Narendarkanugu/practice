import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

const ListingWebsites = ({ classes, websites }) => (
  <div className={classes.section}>
    <div className={classes.sectionHeading}>
      <Typography variant="subtitle1">WEBSITES</Typography>
    </div>
    <div className={classes.sectionContent}>
      <List>
        {websites.map(({ name, linkUrl }) => {
          let logoPath;
          try {
            logoPath = require(`../../../../assets/websites/${
              name.split(".")[0]
              }.png`);
          } catch (e) {
            logoPath = "";
          }
          return (
            <ListItem
              key={linkUrl}
              button
              component="a"
              href={linkUrl}
              target="_blank"
            >
              <ListItemAvatar>
                <Avatar alt={name} src={logoPath} />
              </ListItemAvatar>
              <ListItemText primary={name} />
              <span className={classes.linkIcon}>
                <OpenInNewIcon className={classes.alignIcon} />
              </span>
            </ListItem>
          );
        })}
      </List>
    </div>
  </div>
);

ListingWebsites.propTypes = {
  classes: PropTypes.object,
  websites: PropTypes.array
};

ListingWebsites.defaultProps = {
  classes: {},
  websites: []
};

export default withStyles(styles)(ListingWebsites);
