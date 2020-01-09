export default theme => ({
  listingDetail: {
    minHeight: "calc(100vh - 98px)"
  },
  listingTitle: {
    marginRight: "20%",
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
      marginRight: "10%"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
      padding: 10
      // marginRight: 0
    }
  },
  listingBarContainer: {
    backgroundColor: "#414141",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // paddingRight: 20,
    padding: "20px 0px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      padding: "10px 0px"
    }
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
    zIndex: 1,
    [theme.breakpoints.up("sm")]: {
      "& .MuiTabs-flexContainer": {
        justifyContent: "center"
      }
    }
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
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  addressDiv: {
    width: "80%",
    float: "right",
    // marginLeft: "-20%",
    [theme.breakpoints.down("sm")]: {
      width: "90%"

      // float: "right"
    }
  }
});
