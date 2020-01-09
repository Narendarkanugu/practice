export default theme => ({
  actionHeading: {
    position: "relative",
    marginBottom: theme.spacing(3)
  },
  flexAlignCenter: {
    display: "flex",
    alignItems: "center"
  },
  container: {
    width: "100%",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: 0
    }
  },
  table: {
    width: "100%",
    border: `1px solid rgba(224, 224, 224, 1)`
  },
  card: {
    "& .MuiListItem-root": {
      height: 60
    }
  },
  header: {
    backgroundColor: "#f4f4f4",
    display: "flex",
    justifyContent: "space-between"
  },
  flex: {
    display: "flex"
  },
  flexSpaceBetween: {
    display: "flex",
    justifyContent: "space-between"
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  icon: {
    height: 24,
    marginRight: 4
  },
  overflowHidden: {
    overflow: "hidden"
  }
});
