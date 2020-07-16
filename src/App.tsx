// import React from "react";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import Link from "@material-ui/core/Link";
// import ProTip from "./ProTip";
//
// // function Copyright() {
// //   return (
// //     <Typography variant="body2" color="textSecondary" align="center">
// //       {"Copyright © "}
// //       <Link color="inherit" href="https://material-ui.com/">
// //         Your Website
// //       </Link>{" "}
// //       {new Date().getFullYear()}
// //       {"."}
// //     </Typography>
// //   );
// // }
//
// export default function App() {
//   return (
//     <Container maxWidth="sm">
//       <Box my={4}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Create React App v4-beta example with TypeScript
//         </Typography>
//         <ProTip />
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }

import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "./theme";

import CanvasLayout from "./CanvasLayout";

import { ToggleThemeContext } from "./hooks/toggleTheme";

import Store from "./store";

export default function App() {
  const [themeState, setThemeState] = useState("light");

  return (
    <ToggleThemeContext.Provider value={[themeState, setThemeState]}>
      <ThemeProvider theme={themeState === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <Store>
          <CanvasLayout />
        </Store>
      </ThemeProvider>
    </ToggleThemeContext.Provider>
  );
}
