"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { AuthProvider } from "../context/AuthContext";

const theme = createTheme({
  typography: {
    fontFamily: '"MaisonNeue", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily: '"MaisonNeue", sans-serif',
        },
      },
    },
  },
});

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
