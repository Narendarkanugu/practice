export default theme => ({
  filterContainer: {
    position: "relative",
    padding: `${theme.spacing(1.25)}px ${theme.spacing(2)}px`,
    backgroundColor: "#EEEEEE",
    margin: "0 0 0 auto",
    [theme.breakpoints.down("md")]: {
      margin: `${theme.spacing(2)}px 0 0`
    }
  },
  filterCancelBtn: {
    position: "absolute",
    top: "50%",
    right: theme.spacing(),
    transform: "translateY(-50%)",
    cursor: "pointer",
    border: "none",
    background: "transparent"
  },
  searchBox: {
    width: "100%"
  }
});
