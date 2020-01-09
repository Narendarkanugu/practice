
export default () => ({
  loadingContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 1
  },

  textContainer: {
    "& p:first-child": {
      marginBottom: 30
    },
    textAlign: "center"
  }
});
