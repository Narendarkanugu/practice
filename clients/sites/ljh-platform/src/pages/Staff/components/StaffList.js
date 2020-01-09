import React from "react";
import PropTypes from "prop-types";
import EmptyState from "@clients-modules/react/lib/components/EmptyState";
import Box from '@material-ui/core/Box';
import {
    Paper,
    List,
    ListItem,
    Typography,
    Tooltip,
    Grid
} from "@material-ui/core";


import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Loading from "@clients-modules/react/lib/components/Loading";

import { withStyles } from "@material-ui/core/styles";

import moment from "moment";

import styles from "../styles";

const formatNumber = value => {
    if (!value || value === 0) {
        return "-";
    }
    return value;
};
var index = 0;
const StaffList = ({
    classes,
    staff,
    filterText,
    loader,
    officeName
}) => {
    var content = ""
    if (loader) {
        content = (
            <Loading />
        );
    }
    else if (staff.length !== 0) {
        staff.sort((a, b) => a.name.localeCompare(b.name));
        content = staff.map(staff => {
            index++;
            const {
                name,
                email,
                roleDisplay,
                agentId,
                mobile,
                startDate,
                terminationFormUrl,
                updateFormUrl,
            } = staff;


            const staffStats = [
                {
                    name: "Phone",
                    value: mobile ? mobile : "-"
                },
                { name: "Staff ID", value: formatNumber(agentId) },
                { name: "Start date", value: startDate ? moment(startDate).format("D MMM YY") : "-" }
            ];


            return (
                <Paper className={classes.staffListItem} key={index}>
                    <List disablePadding key={agentId}>
                        <ListItem key={index}
                            classes={{ root: classes.staffListItemHeader }}
                            divider
                        >
                            <Typography component="div" noWrap={true} className={classes.respTextMbl}>
                                <Box color="text.primary" m={1}>{name}</Box>
                                <Box color="text.primary" m={1}>{roleDisplay}</Box>
                                <Box color="text.secondary" m={1}>{email}</Box>
                            </Typography>
                        </ListItem>
                        {staffStats.map(({ name, value }) => (
                            <ListItem key={name}
                                classes={{ root: classes.staffListItemStat }}
                                divider
                            >
                                <Typography>{name}</Typography>
                                <Typography>{value}</Typography>
                            </ListItem>
                        ))}
                        <ListItem key={"update" + index} classes={{ root: classes.staffListItemStat }} divider>
                            <Typography>Update details form</Typography>
                            <Tooltip title="Update details form">
                                <a href={updateFormUrl ? updateFormUrl.replace("control40224898=&", `control40224898=${officeName}&`) : ""} style={updateFormUrl ? { color: '#757070' } : { pointerEvents: "none", color: '#757070' }} target='_new'>
                                    <AssignmentIndIcon /></a>
                            </Tooltip>
                        </ListItem>
                        <ListItem key={"terminate" + index} classes={{ root: classes.staffListItemStat }} divider>

                            <Typography>Termination form</Typography>
                            {terminationFormUrl &&
                                <Tooltip title="Termination form">
                                    <a href={terminationFormUrl ? terminationFormUrl.replace("control40225132=&", `control40225132=${officeName}&`) : ""} style={terminationFormUrl ? { color: '#757070' } : { pointerEvents: "none", color: '#757070' }} target='_new'>
                                        <MeetingRoomIcon /></a>
                                </Tooltip>
                            }
                        </ListItem>

                    </List>
                </Paper>
            );

        });
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
StaffList.propTypes = {
    classes: PropTypes.object,
    staff: PropTypes.array,
};

export default withStyles(styles)(StaffList);
