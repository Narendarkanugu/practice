import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid, Link, Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Fuse from "fuse.js";

import StaffContext from "../../contexts/StaffContext";
import AuthContext from "@clients-modules/react/lib/contexts/AuthContext";

import PageContainer from "@clients-modules/react/lib/components/PageContainer";
import StaffTable from "./components/StaffTable";
import StaffList from "./components/StaffList";
import AddIcon from '@material-ui/icons/Add';
import styles from "./styles";

const Staff = ({ classes }) => {

    var staff = [];
    const disableActions = false;
    var newStaffFormUrl = "";

    const { currentOffice } = useContext(AuthContext);
    const { officesStaff, error } = useContext(StaffContext);
    if (error) {
        staff = [];
    }

    if (officesStaff.length > 0) {
        const staffData = officesStaff.filter(s => s.officeId === currentOffice.officeId);
        if (staffData.length > 0) {
            staff = staffData[0].agents;
            newStaffFormUrl = staffData[0].newStaffFormUrl
        }
        else
            staff = [];
    } else {
        staff = [];
    }

    const [staffList, setStaffList] = useState(staff);
    const [filterText, setFilterText] = useState("");
    const [dataloader, setDataLoader] = useState(true);

    const filterOptions = {
        // Determines which property to match on
        keys: ["name", "mobile", "agentId", "email", "roleDisplay",],
        // Determines how perfect a match should be (0.0 = perfect)
        threshold: 0.1
    };

    const staffFilter = (e) => {
        const fuse = new Fuse(staff, filterOptions);
        setFilterText(e.target.value);
        if (e.target.value && /\S/.test(e.target.value)) {
            var filterval = (e.target.value).replace(/\s{2,}/g, ' ');
            setStaffList(fuse.search(filterval.trim()));
        } else {
            setStaffList(staff)
        }
        return fuse.search(e.target.value);
    }

    useEffect(() => {
        setDataLoader(false);
        setStaffList(staff);
        setFilterText("");
        document.getElementById("filled-search").value = "";
    }, [staff]);


    return (
        <PageContainer>
            <Grid
                container
                direction="column"
                spacing={2}
                className={classes.customeTitle}
            >
                <Grid alignItems="center" container>
                    <Grid item xs={12} md={9}>
                        <Typography component="h1" variant="h4">
                            Staff
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            id="filled-search"
                            placeholder="Search staff"
                            type="search"
                            fullWidth
                            defaultValue={filterText}
                            className={classes.customFilter}
                            margin="normal"
                            autoComplete="off"
                            variant="filled"
                            InputProps={{ disableUnderline: true }}
                            onChange={(event) => staffFilter(event)}
                        />
                    </Grid>
                </Grid>
                <Divider className={classes.gridDivider} />
            </Grid>


            <div className={`${classes.staffListContainer} ${classes.staffTableMarginTop}`}>
                <div className={classes.newStaffBtn}>
                    <Link color="textSecondary" href={newStaffFormUrl} target='_newStaff' className={classes.newStaffLink} >
                        <Button variant="outlined" className={classes.newStaffItemHeader}>
                            <AddIcon className={classes.newStaffIcon} /> NEW STAFF </Button>
                    </Link>
                </div>
                {/* Desktop staff table - hides when viewport is lower than 960px wide */}
                <div className={classes.staffDesktop}>
                    <div className={classes.staffTableContainer}>
                        <StaffTable
                            disableActions={disableActions}
                            staff={staffList}
                            filterText={filterText}
                            loader={dataloader}
                            officeName={currentOffice.officeName}
                        />
                    </div>
                </div>
            </div>
            {/* Mobile timeline - shows when viewport is lower than 960px wide */}
            <div className={classes.staffMobile}>
                <StaffList
                    staff={staffList}
                    filterText={filterText}
                    loader={dataloader}
                    officeName={currentOffice.officeName}
                />
            </div>

        </PageContainer >
    );
};

Staff.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(Staff);
