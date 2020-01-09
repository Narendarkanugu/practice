import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { size, isUndefined } from "lodash";
import { Edit, ChevronRight } from "@material-ui/icons";
import {
  IconButton,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography
} from "@material-ui/core";

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

const desc = (a, b, orderBy) => {
  const valueA = a[orderBy] || 0;
  const valueB = b[orderBy] || 0;

  if (valueB < valueA) {
    return -1;
  }
  if (valueB > valueA) {
    return 1;
  }
  return 0;
};

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

/* 
  Test to see if any inspection stats have been populated.
  Only allow publishing on records that have been previously saved.
*/
const isInspectionPublishable = ({
  groupsAttendedCount,
  groupsInterestedCount,
  contractsIssuedCount,
  offersReceivedCount,
  marketValueOpinionDollarsMin,
  marketValueOpinionDollarsMax,
  comments
}) => {
  return (
    !isUndefined(groupsAttendedCount) &&
    !isUndefined(groupsInterestedCount) &&
    !isUndefined(contractsIssuedCount) &&
    !isUndefined(offersReceivedCount) &&
    !isUndefined(marketValueOpinionDollarsMin) &&
    !isUndefined(marketValueOpinionDollarsMax) &&
    !isUndefined(comments)
  );
};

const ListingInspectionTableBody = ({
  disableActions,
  inspections,
  isRowSelected,
  handleRowClick,
  order,
  orderBy,
  rowsPerPage,
  page,
  toggleEditInspectionDialog,
  toggleInspectionStatusDialog
}) => {
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, inspections.length - page * rowsPerPage);
  return (
    <TableBody>
      {stableSort(inspections, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(n => {
          const isSelected = isRowSelected(n.inspectionId);
          const isPublishable = isInspectionPublishable(n);
          return (
            <React.Fragment key={n.inspectionId}>
              <TableRow hover>
                <TableCell padding="none">
                  <Tooltip title="Show comments">
                    <IconButton
                      onClick={event => handleRowClick(event, n.inspectionId)}
                    >
                      <ChevronRight
                        style={{ transform: isSelected ? "rotate(90deg)" : "" }}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="left" padding="none">
                  {moment(n.startDateTime).format("D MMM YY")}
                </TableCell>
                <TableCell align="left" padding="none">
                  {moment(n.startDateTime).format("LT")}
                </TableCell>
                <TableCell align="right" padding="dense">
                  {formatNumber(n.groupsAttendedCount)}
                </TableCell>
                <TableCell align="right" padding="dense">
                  {formatNumber(n.groupsInterestedCount)}
                </TableCell>
                <TableCell align="right" padding="dense">
                  {formatNumber(n.contractsIssuedCount)}
                </TableCell>
                <TableCell align="right" padding="dense">
                  {formatNumber(n.offersReceivedCount)}
                </TableCell>
                <TableCell align="right" padding="dense">
                  {formatCurrency(n.marketValueOpinionDollarsMin)}
                </TableCell>
                <TableCell align="right" padding="dense">
                  {formatCurrency(n.marketValueOpinionDollarsMax)}
                </TableCell>
                <TableCell align="right" padding="dense">
                  <Tooltip
                    title={`This inspection is currently ${
                      n.published ? "published" : "unpublished"
                    } on the vendor's timeline`}
                  >
                    <Switch
                      color="default"
                      disabled={disableActions || !isPublishable}
                      checked={n.published}
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleInspectionStatusDialog(n);
                      }}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell align="right" padding="dense">
                  <Tooltip title="Edit inspection">
                    <IconButton
                      disabled={disableActions}
                      onClick={() => toggleEditInspectionDialog(n)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow
                style={{
                  display: isSelected ? "table-row" : "none",
                  padding: 24,
                  minHeight: 100
                }}
              >
                <TableCell colSpan={11}>
                  {size(n.comments) > 0 ? (
                    n.comments.map(text => (
                      <Typography style={{ margin: 20 }} variant="caption">
                        {text}
                      </Typography>
                    ))
                  ) : (
                    <Typography style={{ margin: 20 }} variant="caption">
                      No comments entered yet for this inspection.
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell colSpan={11} />
        </TableRow>
      )}
    </TableBody>
  );
};

ListingInspectionTableBody.propTypes = {
  inspections: PropTypes.array,
  isRowSelected: PropTypes.func,
  handleRowClick: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  toggleEditInspectionDialog: PropTypes.func
};

export default ListingInspectionTableBody;
