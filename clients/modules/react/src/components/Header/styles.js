import { fade } from "@material-ui/core/styles/colorManipulator";
import { blockParams } from "handlebars";

export default theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  titleLogo: {
    display: "none",
    marginBottom: "auto",
    marginTop: "auto",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  },
  titleLogoImage: {
    height: theme.spacing(4),
    marginTop: theme.spacing(),
    marginRight: theme.spacing(2)
  },
  pageLinkContainer: {
    cursor: "pointer",
    textDecoration: "none",
    padding: `0 ${theme.spacing(2)}px`,
    borderBottom: `5px solid transparent`,
    "&:hover, &.active": {
      borderColor: theme.palette.secondary.main
    },
    [theme.breakpoints.down("xs")]: {
      padding: `0 ${theme.spacing(1.5)}px`,
      display: "none"
    }
  },
  pageLink: {
    color: theme.palette.common.white,
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing()
    },
    lineHeight: "62px"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  officeMenuItem: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  dialogContent: {
    minWidth: "400px",
    minHeight: "150px"
  },
  listingsBadge: {
    top: "-15px",
    right: -5,
    // [theme.breakpoints.down("sm")]: {
    //   right: "72vw"
    // }

  },
  profileMenu: {
    border: "1px solid #d3d4d5"
  },
  profileIcon: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "inline-block"
    }
  },
  officeName: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  officeSwitcherIcon: {
    marginTop: "2px",
    marginLeft: "8px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  menuIcon: {
    display: "block",
    marginLeft: theme.spacing(2),
    cursor: "pointer",
    margin: "16px 0px",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  HamburgerMenuSection: {
    position: "absolute",
    zIndex: 1000,
    width: "100vw",
    height: "90vh",
    borderTop: "1px solid #484848",
    top: "100%",
    bottom: 0,
    "& h6": {
      borderBottom: "1px solid #484848",
      paddingLeft: theme.spacing(2) + 1,
      marginLeft: 0,
      backgroundColor: "#161616"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none !important"
    }
  },
  pageLinkContainerMobile: {
    textDecoration: "none"
  }
});
