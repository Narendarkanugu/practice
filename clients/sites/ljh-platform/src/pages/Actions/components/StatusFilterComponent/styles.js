export default theme => ({
  gridContainer: {
    padding: theme.spacing(),
    margin: "16px"
  },
  gridDivider: {
    margin: `${theme.spacing(3)}px 0`,
    width: "100%"
  },
  statusFilter: {
    padding: "5px"
  },
  disabledLink: {
    pointerEvents: "none",
    backgroundColor: "#fafafa"
  },
  gridSpan: {
    color: theme.palette.grey[600],
    marginLeft: "4px"
  },
  gridButton: {
    color: theme.palette.grey[600],
    marginLeft: "4px"
  },

  statusGrid: {
    color: "#696969"
  },
  statusLink: {
    float: "right",
    width: "25%",
    padding: "8px 0px",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  statusGridList: {
    marginLeft: "-15px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "-35px"
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px"
    }
  },
  clearIcon: {
    padding: 4
  },
  statusBlock: {
    margin: "-19px 0px 5px 0px"
  }
});
