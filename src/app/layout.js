import SWRegister from "../components/SWRegister";
import "./globals.css";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import theme from "@/theme";
import ReactQueryProvider from "./ReactQueryProvider";
import ResponsiveAppBar from "@/components/AppBar";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "MoviesPWA",
  description: "Aplikacja Next.js w formie PWA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${roboto.variable}`}>
        <SWRegister />
        <Toaster position="top-center" reverseOrder={false} />
        <AppRouterCacheProvider>
          <ReactQueryProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ResponsiveAppBar />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
