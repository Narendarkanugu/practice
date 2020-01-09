export default theme => ({
  table: {
    tableLayout: "fixed",
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
  inspectionContent: {
    border: `1px solid rgba(224, 224, 224, 1)`
  },
  inspectionTableContainer: {
    width: "100%",
    margin: "0 auto",
    maxWidth: 900,
    overflowX: "auto"
  },
  inspectionCardPreview: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  inspectionDesktop: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  inspectionsTableContainer: {
    width: "100%"
  },
  inspectionMobile: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  inspectionListItem: {
    margin: theme.spacing(3)
  },
  inspectionListItemHeader: {
    backgroundColor: "#f4f4f4",
    textTransform: "uppercase"
  },
  inspectionListItemStat: {
    display: "flex",
    justifyContent: "space-between"
  }
});
