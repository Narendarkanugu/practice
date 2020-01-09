import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

const rows = [
    { id: "name", numeric: false, label: "Name", sortable: true, padding: "10" },
    { id: "mobile", numeric: false, label: "Phone", sortable: true },
    { id: "agentId", numeric: false, label: "Staff ID", sortable: true },
    { id: "startDate", numeric: false, label: "Start date", sortable: true },
    { id: "update", numeric: false, label: "Update", sortable: false },
    { id: "terminate", numeric: false, label: "Terminate", sortable: false }
];

class StaffTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {/* <TableCell padding="none" /> */}
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align="left"
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
                                            style={row.padding ? { paddingLeft: "10px" } : {}}
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
                    {/* <TableCell padding="none" /> */}
                </TableRow>
            </TableHead>
        );
    }
}

StaffTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default StaffTableHead;
