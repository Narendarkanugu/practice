export default theme => ({
  subHeading: {
    marginBottom: "15px"
  },

  cardsGrid: {
    justifyContent: "stretch",
    paddingLeft: 4
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0
  }
});
