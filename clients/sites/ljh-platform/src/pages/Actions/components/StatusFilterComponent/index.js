import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Grid,
  Link,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Button
} from "@material-ui/core";
import styles from "./styles";

const StatusFilterComponent = ({
  listingStatuses,
  classes,
  getStatus,
  statusesInfo
}) => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [itemsInMenu, setItemsInMenu] = React.useState([
    "All",
    ...listingStatuses.sort()
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectItem = item => {
    handleClose();
    if (item === "All") {
      selectAll();
    } else {
      var tempItems = selectedItems;
      if (selectedItems.indexOf(item) === -1) {
        tempItems.push(item);
        setSelectedItems(tempItems.sort());
        //  Removing element from itemsInMenu

        var itemsInMenuTemp = itemsInMenu;
        if (itemsInMenu.length > 3) {
          itemsInMenuTemp.splice(itemsInMenu.indexOf(item), 1);
        } else {
          itemsInMenuTemp.splice(itemsInMenu.indexOf("All"), 1);
          itemsInMenuTemp.splice(itemsInMenu.indexOf(item), 1);
        }
        setItemsInMenu(itemsInMenuTemp.sort());
        if (itemsInMenu.length === 0) {
          document
            .getElementById("add-status-link")
            .classList.add(classes.disabledLink);
        }
      }
      getStatus(selectedItems);
    }
  };

  const selectAll = () => {
    setSelectedItems([]);
    setSelectedItems(listingStatuses.sort());
    setItemsInMenu([]);
    document
      .getElementById("add-status-link")
      .classList.add(classes.disabledLink);
    getStatus(listingStatuses.sort());
  };

  const clearAll = () => {
    setSelectedItems([]);
    setItemsInMenu(["All", ...listingStatuses.sort()]);
    document
      .getElementById("add-status-link")
      .classList.remove(classes.disabledLink);
    getStatus([]);
  };

  const removeItem = item => {
    var tempItems = selectedItems;
    tempItems.splice(selectedItems.indexOf(item), 1);
    setSelectedItems([...tempItems.sort()]);
    if (itemsInMenu.indexOf(item) === -1) {
      if (itemsInMenu.length === 1) {
        itemsInMenu.splice(0, 0, "All");
      }
      var tempItemsMenu = itemsInMenu;
      tempItemsMenu.push(item);
      setItemsInMenu(tempItemsMenu.sort());
    }
    document
      .getElementById("add-status-link")
      .classList.remove(classes.disabledLink);
    getStatus(selectedItems);
  };

  return (
    <Grid style={{ width: "100%" }}>
      <Grid item xs={12} md={3} className={classes.statusLink}>
        <Link
          id="add-status-link"
          component="button"
          variant="body2"
          aria-controls="statuses-menu"
          aria-haspopup="true"
          onClick={handleClick}
          focus="none"
        >
          <Typography id="add-status" color="textSecondary" variant="subtitle2">
            {"+ Filter listing status"}
          </Typography>
        </Link>
        {itemsInMenu.length > 0 && (
          <Menu
            id="statuses-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {itemsInMenu.map(status => (
              <MenuItem
                key={status}
                onClick={() => {
                  selectItem(status);
                }}
              >
                {status}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Grid>

      <Divider className={classes.gridDivider} />

      {selectedItems.length > 0 && (
        <Grid
          alignItems="center"
          container
          spacing={0}
          className={classes.statusBlock}
        >
          <Grid item xs={12} md={3} lg={2} className={classes.statusGrid}>
            {statusesInfo}
          </Grid>
          <Grid item xs={12} md={9} lg={10} className={classes.statusGridList}>
            {selectedItems.map(status => {
              return (
                <Button size="small" key={status}>
                  {status}
                  <ClearIcon
                    className={classes.clearIcon}
                    onClick={() => {
                      removeItem(status);
                    }}
                  ></ClearIcon>
                </Button>
              );
            })}

            {selectedItems.length > 1 && (
              <React.Fragment>
                <span className={classes.gridSpan}>|</span>
                <Button
                  size="small"
                  className={classes.gridButton}
                  onClick={clearAll}
                >
                  Clear
                </Button>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export default withStyles(styles)(StatusFilterComponent);
