import SWRegister from "./components/SWRegister";
import "./globals.css";
import { Roboto } from "next/font/google";

import MaterialUIProvider from "./MaterialUIProvider";

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
        <MaterialUIProvider>{children}</MaterialUIProvider>
      </body>
    </html>
  );
}
