"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const colors = {
  flame: "#e4572e",
  delft_blue: "#29335c",
  orange_web: "#f3a712",
  olivine: "#a8c686",
  air_superiority_blue: "#669bbc",
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: colors.flame,
      contrastText: "#fff",
    },
    secondary: {
      main: colors.delft_blue,
      contrastText: "#fff",
    },
    warning: {
      main: colors.orange_web,
    },
    success: {
      main: colors.olivine,
    },
    info: {
      main: colors.air_superiority_blue,
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#29335c",
      secondary: "#e4572e",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: "info" },
              style: {
                backgroundColor: "#60a5fa",
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;
