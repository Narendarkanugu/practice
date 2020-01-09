import React from "react";
import PropTypes from "prop-types";
import { Table, TablePagination, Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import size from "lodash/size";

import EmptyState from "@clients-modules/react/lib/components/EmptyState";
import Loading from "@clients-modules/react/lib/components/Loading";
import StaffTableBody from "./StaffTableBody";
import StaffTableHead from "./StaffTableHead";

import styles from "../styles";

class StaffTable extends React.Component {
    state = {
        order: "asc",
        orderBy: "name",
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

    handleRowClick = (_, agentId) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(agentId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, agentId);
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

    isRowSelected = agentId =>
        this.state.selected.indexOf(agentId) !== -1;

    render() {
        const {
            classes,
            disableActions,
            staff,
            filterText,
            loader,
            officeName
        } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;

        let content = null;
        if (loader) {
            content = (
                <Loading />
            );
        }
        else if (size(staff) !== 0) {
            content = (
                <div className={classes.staffContent}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <StaffTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={staff.length}
                            />
                            <StaffTableBody
                                disableActions={disableActions}
                                handleRowClick={this.handleRowClick}
                                staff={staff}
                                isRowSelected={this.isRowSelected}
                                officeName={officeName}
                                {...this.state}
                            />
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={staff.length < 10 ? [] : [10, 25, 50]}
                        component="div"
                        count={staff.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        style={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
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
                        title="No staff"
                        iconName="clipboard-list"
                        content={
                            filterText ?
                                <Typography>No matches found for "{filterText}".</Typography>
                                :
                                <Typography></Typography>
                        }
                    />
                </Grid>
            );
        }

        return content;
    }
}

StaffTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaffTable);
