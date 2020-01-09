import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faBug,
  faCameraRetro,
  faChartArea,
  faCheckCircle,
  faClipboardList,
  faDollarSign,
  faEnvelope,
  faExclamationCircle,
  faEye,
  faFileAlt,
  faFileContract,
  faHeart,
  faHome,
  faInfoCircle,
  faKey,
  faStar,
  faTag,
  faTasks,
  faTimes,
  faTruckMoving,
  faUsers,
  faUserCircle,
  faStickyNote,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";

/* FontAwesome icons */
library.add(
  faArrowLeft,
  faBug,
  faCameraRetro,
  faChartArea,
  faCheckCircle,
  faClipboardList,
  faDollarSign,
  faEnvelope,
  faExclamationCircle,
  faEye,
  faFileAlt,
  faFileContract,
  faHeart,
  faHome,
  faInfoCircle,
  faKey,
  faStar,
  faTag,
  faTasks,
  faTimes,
  faTruckMoving,
  faUsers,
  faUserCircle,
  faStickyNote,
  faAngleDown
);

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
    overrides: {
      MuiSwitch: {
        switchBase: {
          "&$checked": {
            color: teal["A700"]
          },
          "&$checked + $track": {
            backgroundColor: teal["A700"]
          },
          "&$checked&$disabled + $track": {
            backgroundColor: "#161616"
          },
        },
      },
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
