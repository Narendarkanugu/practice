
export default theme => ({
    staffListContainer: {
        width: "100%",
        padding: 25,
        margin: "0 auto",
        backgroundColor: "transparent",
        boxShadow: "1px 1px 2px 2px #E0E0E0",
        maxWidth: 1050,
        minHeight: "80vh",
        borderRadius: 5,
        [theme.breakpoints.down("sm")]: {
            boxShadow: "none",
            padding: "unset",
            minHeight: "unset"
        }
    },
    table: {
        tableLayout: "auto",
        [theme.breakpoints.down("md")]: {
            tableLayout: "auto"
        }
    },
    tablePaper: {
        display: "flex",
        padding: theme.spacing(3),
        minHeight: 600,
        overflowX: "auto"
    },
    tableWrapper: {
        overflowX: "auto"
    },
    staffContent: {
        border: `1px solid rgba(224, 224, 224, 1)`,
        "& th": {
            padding: 10,
            height: 56
        },
        "& td": {
            padding: 10,
            border: "none",
        },
        "& tbody": {
            "& tr": {
                "&:first-child": {
                    "& td": {
                        paddingTop: 16
                    }
                },
                "&:last-child": {
                    "& td": {
                        paddingBottom: 20
                    }
                }
            }
        },
    },
    staffTableContainer: {
        width: "100%",
        margin: "0 auto",
        maxWidth: 1000,
        overflowX: "auto"
    },
    staffTableMarginTop: {
        margin: "35px auto",
        [theme.breakpoints.down("sm")]: {
            margin: "0px auto"
        }
    },
    margin: {
        margin: theme.spacing(1),
    },
    staffDesktop: {
        display: "flex",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    staffMobile: {
        width: "100%",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    staffListItem: {
        margin: "20px 8px"
        //   margin: theme.spacing(3)
    },
    staffListItemHeader: {
        backgroundColor: "#f4f4f4",
        "& div": {
            marginLeft: 0
        }
    },
    staffListItemStat: {
        display: "flex",
        justifyContent: "space-between"
    },
    searchBox: {
        width: "100%"
    },
    customeTitle: {
        maxWidth: "100%",
        margin: "-10px auto",
        [theme.breakpoints.down("md")]: {
            margin: "0px auto"
        },
        [theme.breakpoints.down("sm")]: {
            margin: "1px auto"
        }

    },
    customFilter: {
        '& div': {
            borderRadius: 0,
            backgroundColor: "#EEEEEE",
            marginTop: "-6px",
            "& input": {
                padding: "17px 12px 17px 13px",
                "&::-webkit-search-cancel-button": {
                    cursor: "pointer",
                    "-webkit-appearance": "none",
                    height: 20,
                    width: 20,
                    display: "block",
                    backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAFtSURBVCjPZdMxSxxBGMbx/zMjxCor5wcQWzubdHZemTJdvBO8qzSNCCsGLlWQs0illQYifgCLgKB72CjY5KsoNzZ64O6bwr272b3t9t0fM8zzzOrW59v2U3/Z4alJ9cmgwbF91nd/4r9+sx4LrLDg7jdGFxWmxA5pMc8ne9HNkASAnDOXWmhGrOjTwQMQnK54A8DTKfpKsvGmMXvT1Zy2CdbFlxSXZoHqarnOdOBbr7pnkVUc4Fi1RXen+Rrbt6FgAIn1bfKBc6AdsdRCE8EMNXifT9l4UKfU2QTCAD7aL9uaOv3WLs/r5Zsbjw0wRethep9WYIaS4oh2pcF2cTTOtdy61kJ0mGlbmmG5/oBtTsIqqc9mW9jTdb2CjZFvN4pDunG8PDPSXYU23MOcHfOlwsI6MAhKoczV07EkumZxvOVtnFYQnHo8ArlOYwZNLCjVKTnwqJ7v/stfWNOl9hhWf4ULWiM9sMSyfnw4+Q+SlbR4/DdG2gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wOS0yMFQwMTowNzo0Mi0wNTowMBN13hUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDktMjBUMDE6MDc6NDItMDU6MDBiKGapAAAAAElFTkSuQmCC)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 16
                }
            }, [theme.breakpoints.down("md")]: {
                marginTop: "0px"
            }
        }

    },
    gridDivider: {
        marginTop: 10,
        [theme.breakpoints.down("md")]: {
            marginTop: 14
        }
    },
    iconHoverable: {
        "& svg": {
            width: 52,
            height: 52,
            padding: 12,
            "&:hover": {
                backgroundColor: "#DADADA",
                borderRadius: '50px'
            },
            [theme.breakpoints.up("md")]: {
                marginTop: 5
            }
        }
    },
    loader: {
        display: "inline-block",
        paddingLeft: "50%",
        paddingTop: "25%",
        [theme.breakpoints.down("md")]: {
            paddingTop: "20%"
        }
    },
    respTextMbl: {
        wordWrap: "break-word",
        whiteSpace: "initial"
    },
    newStaffIcon: {
        color: '#757575',
        marginRight: "5px"
    },
    newStaffItemHeader: {
        color: '#2D2D2D',
        fontWeight: 600,
        fontSize: '0.75rem',
        letterSpacing: '0.75px',
        padding: "10px 15px 10px 10px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginTop: "15px",
            padding: "auto"
        }
    },
    newStaffLink: {
        float: 'right',
        marginBottom: 25,
        textDecoration: "none !important",
        [theme.breakpoints.down("sm")]: {
            float: "none",
            marginBottom: "0px"
        }
    },
    newStaffBtn: {
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            padding: "0px 8px"
        }
    }
});
