import React from "react";
import PropTypes from "prop-types";
import { Table, TablePagination, Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import size from "lodash/size";

import EmptyState from "@clients-modules/react/lib/components/EmptyState";
import ListingInspectionTableBody from "./ListingInspectionTableBody";
import ListingInspectionTableHead from "./ListingInspectionTableHead";

import styles from "./styles";

class ListingInspectionTable extends React.Component {
  state = {
    order: "desc",
    orderBy: "startDateTime",
    selected: [],
    page: 0,
    rowsPerPage: 10
  };

  handleRequestSort = (_, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleRowClick = (_, inspectionId) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(inspectionId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, inspectionId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isRowSelected = inspectionId =>
    this.state.selected.indexOf(inspectionId) !== -1;

  render() {
    const {
      classes,
      disableActions,
      inspections,
      toggleEditInspectionDialog,
      toggleInspectionStatusDialog
    } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;

    let content = null;
    if (size(inspections) !== 0) {
      content = (
        <div className={classes.inspectionContent}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <ListingInspectionTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={inspections.length}
              />
              <ListingInspectionTableBody
                disableActions={disableActions}
                handleRowClick={this.handleRowClick}
                inspections={inspections}
                isRowSelected={this.isRowSelected}
                toggleEditInspectionDialog={toggleEditInspectionDialog}
                toggleInspectionStatusDialog={toggleInspectionStatusDialog}
                {...this.state}
              />
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={inspections.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      );
    } else {
      content = (
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{
            minHeight: "100%"
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
      );
    }

    return content;
  }
}

ListingInspectionTable.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleEditInspectionDialog: PropTypes.func,
  listingDetails: PropTypes.object,
  listingInspectionCampaigns: PropTypes.object
};

export default withStyles(styles)(ListingInspectionTable);
