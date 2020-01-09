export default theme => ({
  listingTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 30
    }
  },
  listingBarContainer: {
    height: "100px",
    backgroundColor: "#414141",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  listingBar: {
    width: "100%",
    textAlign: "center",
    position: "relative",
    color: "#FFF"
  },
  listingBackButton: {
    position: "absolute",
    top: "50%",
    left: 24,
    transform: "translateY(-50%)",
    color: "#FFF",
    display: "inline-flex",
    alignItems: "center"
  },
  listingBackIcon: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  listingBackText: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
      marginLeft: theme.spacing()
    }
  },
  tabHeader: {
    position: "sticky",
    top: 0,
    zIndex: 1
  },
  tabContainer: {
    padding: theme.spacing(3),
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      marginTop: 1
    }
  },
  tabContent: {
    display: "flex",
    padding: theme.spacing(3),
    minHeight: 600,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  }
});
