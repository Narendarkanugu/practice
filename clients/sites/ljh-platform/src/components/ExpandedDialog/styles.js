export default theme => ({
  paper: {
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      height: "90%",
      maxHeight: `calc(100% - ${theme.spacing(6)}px)`
    }
  }
});
