export default theme => ({
  dashboardLinksContainer: {
    padding: theme.spacing(2)
  },
  sectionContainer: {
    height: "100%"
  },
  tableRow: {
    display: "flex",

    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableHeadCell: {
    fontSize: 20,
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white
  },
  dialogContent: {
    padding: theme.spacing(3),
    minWidth: "400px",
    minHeight: "150px"
  },
  tableCell: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  serviceIcon: {
    marginRight: "16px"
  }
});
