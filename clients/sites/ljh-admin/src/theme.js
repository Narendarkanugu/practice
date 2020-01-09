import { createMuiTheme } from "@material-ui/core/styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExclamationCircle,
  faHome,
  faUsers,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

/* FontAwesome icons */
library.add(faExclamationCircle, faHome, faUsers, faUserCircle);

/* Material theme */
export default () =>
  createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#161616",
        // dark: will be calculated from palette.primary.main,
        contrastText: "#FFFFFF"
      },
      secondary: {
        light: "#FFFFFF",
        main: "#fb0101",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#FFFFFF"
      }
    },
    typography: {
      fontFamily: [
        "Poppins",
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      useNextVariants: true
    }
  });
