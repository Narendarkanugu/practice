import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

const rows = [
  { id: "startDateTime", numeric: false, label: "Date", sortable: true },
  { id: "time", numeric: false, label: "Time", sortable: false },
  {
    id: "groupsAttendedCount",
    numeric: true,
    label: "Groups attended",
    sortable: true
  },
  {
    id: "groupsInterestedCount",
    numeric: true,
    label: "Groups interested",
    sortable: true
  },
  {
    id: "contractsIssuedCount",
    numeric: true,
    label: "Contracts issued",
    sortable: true
  },
  {
    id: "offersReceivedCount",
    numeric: true,
    label: "Offers received",
    sortable: true
  },
  {
    id: "marketValueOpinionDollarsMin",
    numeric: true,
    label: "Min OMV",
    sortable: true
  },
  {
    id: "marketValueOpinionDollarsMax",
    numeric: true,
    label: "Max OMV",
    sortable: true
  },
  { id: "published", numeric: true, label: "Published", sortable: true }
];

class ListingInspectionTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="none" />
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={"none"}
                sortDirection={orderBy === row.id ? order : false}
              >
                {row.sortable ? (
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  row.label
                )}
              </TableCell>
            ),
            this
          )}
          <TableCell padding="none" />
        </TableRow>
      </TableHead>
    );
  }
}

ListingInspectionTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default ListingInspectionTableHead;
