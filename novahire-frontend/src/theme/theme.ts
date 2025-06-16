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
      primary: "#000000", // texto blanco
      secondary: "#000000",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    allVariants: {
      color: "#000000",
    },
  },
});

export default theme;
