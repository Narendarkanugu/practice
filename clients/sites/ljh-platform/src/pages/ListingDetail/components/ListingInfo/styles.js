export default theme => ({
  listingInfo: {
    width: "100%"
  },
  listingTitleContainer: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: `0 ${theme.spacing(2)}px`
    }
  },
  listingStatus: {
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
      textAlign: "left"
    }
  },
  section: {
    width: "100%"
  },
  sectionHeading: {
    backgroundColor: "#f4f4f4",
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`
  },
  sectionContent: {
    padding: theme.spacing(2)
  },
  vendorContent: {
    display: "flex",
    justifyContent: "space-between"
  },
  vendorAvatar: {
    margin: 16,
    color: "#FFF"
  },
  vendorList: {
    paddingTop: 0,
    paddingBottom: 0
  },
  vendorListFooter: {
    paddingTop: theme.spacing(),
    width: "100%",
    textAlign: "center"
  },
  vendorDropdown: {
    marginTop: theme.spacing(3)
  },
  listingPhoto: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginBottom: 20,
    minHeight: 400,
    maxWidth: 800,
    [theme.breakpoints.down("md")]: {
      minHeight: 250
    }
  },
  linkIcon: {
    color: "rgba(0, 0, 0, 0.54)"
  },
  alignIcon: {
    marginRight: 11
  },
  listingDetailContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: 200,
    position: "relative"
  },
  vendorTextActive: {
    color: "green"
  },
  vendorTextInactive: {
    color: "#d62d2d"
  }
});
