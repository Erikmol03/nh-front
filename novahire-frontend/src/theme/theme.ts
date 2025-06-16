// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7B1FA2", // morado oscuro
    },
    secondary: {
      main: "#CE93D8", // morado claro
    },
    background: {
      default: "#F3E5F5", // fondo suave
    },
    text: {
      primary: "#FFFFFF", // texto blanco
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    allVariants: {
      color: "#FFFFFF",
    },
  },
});

export default theme;
