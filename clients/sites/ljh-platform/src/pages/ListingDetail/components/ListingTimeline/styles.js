export default theme => ({
  actionHeading: {
    position: "relative",
    marginBottom: theme.spacing(3)
  },
  actionButton: {
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)"
  },
  emptyStateIcon: {
    color: theme.palette.text.secondary,
    height: 80,
    width: 80
  },
  expandPanel: {
    boxShadow: "none",
    border: "1px solid rgba(0, 0, 0, 0.12)"
  },
  formControl: {
    minWidth: 120
  },
  titleContainer: {
    marginTop: 20
  },
  contentContainer: {
    marginTop: 16
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row"
  },
  statusHeader: {
    fontSize: "1.125rem"
  },
  statusSelect: {
    width: "100%",
    marginBottom: theme.spacing(5)
  },
  desktopTimeline: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  mobileTimeline: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  vendorTimelineContainer: {
    width: "100%",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: 0
    }
  }
});
