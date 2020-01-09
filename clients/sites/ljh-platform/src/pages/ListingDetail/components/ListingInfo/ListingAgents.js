import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

const ListingAgents = ({ classes, agents }) => (
  <div className={classes.section}>
    <div className={classes.sectionHeading}>
      <Typography variant="subtitle1">AGENTS</Typography>
    </div>
    <div className={classes.sectionContent}>
      <List>
        {agents.map(({ name, photoUrl, roleDisplay, email }) => {
          return (
            <ListItem key={name}>
              <ListItemAvatar>
                <Avatar alt={name} src={photoUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={
                  <Typography color="textSecondary" noWrap>
                    {roleDisplay}
                  </Typography>
                }
              />
              {email && (
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => window.open(`mailto: ${email}`, "_blank")}
                  >
                    <EmailIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  </div>
);

ListingAgents.propTypes = {
  classes: PropTypes.object,
  agents: PropTypes.array
};

ListingAgents.defaultProps = {
  classes: {},
  agents: []
};

export default withStyles(styles)(ListingAgents);
