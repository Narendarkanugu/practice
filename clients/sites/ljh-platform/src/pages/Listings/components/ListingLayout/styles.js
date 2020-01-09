export default theme => ({
  gridContainer: {
    padding: theme.spacing()
  },
  gridDivider: {
    margin: `${theme.spacing(3)}px 0`
  },
  listContainer: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: theme.spacing(3)
  },
  listingItem: {
    width: "100%",
    maxWidth: 345,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "none"
    }
  },
  listGrid: {
    height: "100%",
    width: "100%"
  },
  listingNotFoundContainer: {
    width: 550,
    height: 390,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  }
});
