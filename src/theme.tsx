//
import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export { lightTheme, darkTheme };
