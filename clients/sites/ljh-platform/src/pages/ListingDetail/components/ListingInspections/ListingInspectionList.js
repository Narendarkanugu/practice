import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Switch,
  Grid
} from "@material-ui/core";
import EmptyState from "@clients-modules/react/lib/components/EmptyState";
import size from "lodash/size";
import { withStyles } from "@material-ui/core/styles";
import { Edit } from "@material-ui/icons";

import moment from "moment";

import styles from "./styles";

const formatCurrency = value => {
  if (!value || value === 0) {
    return "-";
  }
  const num = parseInt(value, 10);
  return `$${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
};

const formatNumber = value => {
  if (!value || value === 0) {
    return "-";
  }
  return value;
};

const ListingInspectionList = ({
  classes,
  disableActions,
  inspections,
  toggleEditInspectionDialog,
  toggleInspectionStatusDialog
}) => {
  if (size(inspections) !== 0) {
    return inspections.map(inspection => {
      const {
        contractsIssuedCount,
        groupsAttendedCount,
        groupsInterestedCount,
        marketValueOpinionDollarsMax,
        marketValueOpinionDollarsMin,
        offersReceivedCount,
        comments,
        startDateTime
      } = inspection;

      const inspectionStats = [
        {
          name: "Groups attended",
          value: groupsAttendedCount
        },
        { name: "Groups interested", value: formatNumber(groupsInterestedCount) },
        { name: "Contracts issued", value: formatNumber(contractsIssuedCount) },
        { name: "Offers received", value: formatNumber(offersReceivedCount) },
        { name: "Min OMV", value: formatCurrency(marketValueOpinionDollarsMin) },
        { name: "Max OMV", value: formatCurrency(marketValueOpinionDollarsMax) }
      ];

      return (
        <Paper className={classes.inspectionListItem}>
          <List disablePadding>
            <ListItem
              classes={{ root: classes.inspectionListItemHeader }}
              divider
            >
              <Typography>
                {moment(startDateTime).format("D MMM YY")} -{" "}
                {moment(startDateTime).format("LT")}
              </Typography>
              <ListItemSecondaryAction>
                <IconButton
                  disabled={disableActions}
                  onClick={() => toggleEditInspectionDialog(inspection)}
                >
                  <Edit />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {inspectionStats.map(({ name, value }) => (
              <ListItem
                classes={{ root: classes.inspectionListItemStat }}
                divider
              >
                <Typography>{name}</Typography>
                <Typography>{value}</Typography>
              </ListItem>
            ))}
            <ListItem classes={{ root: classes.inspectionListItemStat }} divider>
              <Typography>Published</Typography>
              <ListItemSecondaryAction>
                <Switch
                  color="default"
                  disabled={disableActions}
                  checked={inspection.published}
                  onClick={() => toggleInspectionStatusDialog(inspection)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Typography>{comments}</Typography>
            </ListItem>
          </List>
        </Paper>
      );
    });
  } else {
    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{
          minHeight: "50%"
        }}
      >
        <EmptyState
          title="No inspections"
          iconName="clipboard-list"
          content={
            <Typography>
              There are no inspections for this listing yet. Please check back
              later.
          </Typography>
          }
        />
      </Grid>
    )
  }
}
ListingInspectionList.propTypes = {
  classes: PropTypes.object,
  disableActions: PropTypes.bool,
  inspections: PropTypes.array,
  toggleEditInspectionDialog: PropTypes.func
};

export default withStyles(styles)(ListingInspectionList);
