import green from "@material-ui/core/colors/green";

export default theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  icon: {
    fontSize: 20
  },
  iconType: {
    opacity: 0.9,
    marginRight: theme.spacing()
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});
