export default theme => ({
  actionCount: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    position: "absolute",
    top: 24,
    right: 12,
    backgroundColor: theme.palette.secondary.main,
    width: 34,
    height: 34
  },
  cardContainer: {
    width: "100%",
    maxWidth: 345,
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "none"
    }
  },
  cardTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: 280,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "calc(100vw - 80px)"
    },
    textOverflow: "ellipsis"
  },
  cardTitleListings: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: 250,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "calc(100vw - 105px)"
    },
    textOverflow: "ellipsis"
  },
  listingCardMedia: {
    height: 230
  }
});
