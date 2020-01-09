import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import size from "lodash/size";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import EmptyState from "@clients-modules/react/lib/components/EmptyState";

import styles from "./styles";

const ListingVendors = ({
  classes,
  vendors,
  disableActions,
  onRemoveVendor
}) => {
  const renderVendorInfo = (email, lastActive) => {
    if (email) {
      return (
        <React.Fragment>
          <Typography color="textSecondary" noWrap>
            {email}
          </Typography>
          {lastActive ? (
            <Typography
              className={classes.vendorTextActive}
              color="textSecondary"
            >
              last active {moment(lastActive).fromNow()}
            </Typography>
          ) : (
            <Typography
              className={classes.vendorTextInactive}
              color="textSecondary"
            >
              never logged in
            </Typography>
          )}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Typography color="textSecondary">
          No email address available.
        </Typography>
        <Typography color="textSecondary">
          Click on the 'Share With Vendor' button below and enter an email to
          share this listing.
        </Typography>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.section}>
      <div className={classes.sectionHeading}>
        <Typography variant="subtitle1">VENDORS</Typography>
      </div>
      <div className={classes.sectionContent}>
        {size(vendors) === 0 ? (
          <EmptyState
            iconName="users"
            title="No vendors"
            content="Click on the 'Share With Vendor' button below to share this listing with a vendor."
          />
        ) : (
          <List className={classes.vendorList}>
            {vendors.map(
              ({ name, email, lastActive, pictureUrl, sourceCrm }) => (
                <ListItem key={name} alignItems="center" disableGutters>
                  <ListItemAvatar>
                    {pictureUrl ? (
                      <Avatar src={pictureUrl} />
                    ) : (
                      <Avatar className={classes.vendorAvatar}>
                        {name ? name.charAt(0).toUpperCase() : "V"}
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={renderVendorInfo(email, lastActive)}
                  />
                  <ListItemSecondaryAction>
                    {sourceCrm ? (
                      <Chip label="CRM" />
                    ) : (
                      <Tooltip
                        title={"Remove vendor from this listing"}
                        placement="bottom"
                      >
                        <IconButton
                          disabled={disableActions}
                          onClick={() => onRemoveVendor(email)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              )
            )}
          </List>
        )}
      </div>
    </div>
  );
};

ListingVendors.propTypes = {
  classes: PropTypes.object,
  vendors: PropTypes.array
};

ListingVendors.defaultProps = {
  classes: {},
  vendors: []
};

export default withStyles(styles)(ListingVendors);
