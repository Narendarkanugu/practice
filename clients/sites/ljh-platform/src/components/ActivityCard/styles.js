export default theme => ({
  card: {
    width: "100%",
    maxWidth: 345,
    margin: "0 auto",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "none"
    }
  },
  cardCopy: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2)
    }
  },
  cardMedia: {
    // paddingTop: "56.25%" // 16:9
    height: 195
  },
  cardHeader: {
    fontSize: "0.875rem",
    lineHeight: 1.5,
    letterSpacing: "0.01071em"
  },
  cardIcon: {
    margin: 0,
    alignSelf: "center",
    opacity: 0.4,
    width: 28,
    height: 28,
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    "& > span": {
      display: "inline-block",
      width: "100%",
      height: "100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center"
    },
    "&>i": {
      display: "content"
    }
  },
  textWithValueContent: {
    padding: `0 0 10px 0`,
    background: "transparent",
    marginBottom: 10,
    borderBottom: "1px solid #ccc"
  },
  textWithValueContentText: {
    fontSize: "0.875rem"
  },
  textWithValueContentValue: {
    fontSize: "1.375rem",
    color: "rgba(0, 0, 0, 0.54)",
    textAlign: "center"
  },
  paragraphText: {
    marginBottom: theme.spacing(2),
    whiteSpace: "pre-line",
    "& p": {
      minHeight: 65
    }
  },
  eventContent: {
    "& + div": {
      marginTop: theme.spacing(2)
    }
  },
  eventText: {
    fontSize: "0.8125rem"
  },
  eventValue: {
    color: "rgba(0, 0, 0, 0.54)"
  },
  document: {
    padding: "16px 32px 0 16px",
    display: "flex",
    textDecoration: "none",
    cursor: "pointer"
  },
  icon: {
    width: 24,
    marginRight: 4
  },
  secondaryLinks: {
    position: "absolute",
    right: 4,
    bottom: 4
  },
  contentToggleBtns: {
    background: "#f1eeee",
    borderRadius: "50%",
    verticalAlign: "top",
    // float: "right", 
    cursor: "pointer",
    color: "#757575"
  }
});
