export default theme => ({
  stats: {
    backgroundColor: "#ececec",
    borderRadius: 5,
    marginBottom: 20,
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: `${theme.spacing(1.5)}px ${theme.spacing()}px`
    }
  },
  statSection: {
    width: "100%",
    marginBottom: theme.spacing()
  },
  statNumber: {
    textAlign: "center",
    fontSize: 28,
    [theme.breakpoints.down("sm")]: {
      fontSize: 26
    }
  },
  statText: {
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
      fontSize: 16
    }
  },
  iconContainer: {
    textAlign: "center",
    fontSize: 50,
    [theme.breakpoints.down("sm")]: {
      fontSize: 24
    }
  },
  chartContainer: {
    marginTop: theme.spacing(2)
  },
  reportContainer: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3)
    }
  }
});
