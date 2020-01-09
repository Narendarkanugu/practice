import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Box from '@material-ui/core/Box';
import {
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
    // IconButton,
    Link
} from "@material-ui/core";

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { withStyles } from "@material-ui/core/styles";
import styles from "../styles";

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

const formatNumber = value => {
    if (!value || value === 0) {
        return "-";
    }
    return value;
};

const StaffTableBody = ({
    staff,
    officeName,
    order,
    orderBy,
    rowsPerPage,
    page,
    classes
}) => {
    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, staff.length - page * rowsPerPage);
    return (
        <TableBody >
            {stableSort(staff, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {

                    return (
                        <React.Fragment key={n.agentId} >
                            <TableRow hover>
                                <TableCell align="left" padding="none" >
                                    <Box style={{ paddingLeft: "10px" }} color="text.primary">{n.name}</Box>
                                    <Box style={{ paddingLeft: "10px", textTransform: "capitalize" }} color="text.primary">{n.roleDisplay}</Box>
                                    <Box style={{ paddingLeft: "10px" }} color="text.secondary">{n.email}</Box>
                                </TableCell>
                                <TableCell align="left" padding="none">
                                    {n.mobile ? n.mobile : "-"}
                                </TableCell>
                                <TableCell align="left" padding="none">
                                    {formatNumber(n.agentId)}
                                </TableCell>
                                <TableCell align="left" padding="none">
                                    {n.startDate ? moment(n.startDate).format("D MMM YY") : "-"}
                                </TableCell>

                                <TableCell align="left" padding="none" className={classes.iconHoverable}>
                                    <Tooltip title="Update details form" >

                                        <Link href={n.updateFormUrl ? n.updateFormUrl.replace("control40224898=&", `control40224898=${officeName}&`) : ""}
                                            style={n.updateFormUrl ? { color: '#757070' } : { pointerEvents: "none", color: '#757070' }} target='_new'>
                                            <AssignmentIndIcon />
                                        </Link>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="left" className={classes.iconHoverable}>
                                    {n.terminationFormUrl &&
                                        <Tooltip title="Termination form">
                                            <Link href={n.terminationFormUrl ? n.terminationFormUrl.replace("control40225132=&", `control40225132=${officeName}&`) : ""} style={n.terminationFormUrl ? { color: '#757070' } : { pointerEvents: "none", color: '#757070' }} target='_new'>
                                                <MeetingRoomIcon />
                                            </Link>
                                        </Tooltip>
                                    }
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

StaffTableBody.propTypes = {
    staff: PropTypes.array,
    officeName: PropTypes.string,
    isRowSelected: PropTypes.func,
    handleRowClick: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    toggleEditInspectionDialog: PropTypes.func
};

export default withStyles(styles)(StaffTableBody);
