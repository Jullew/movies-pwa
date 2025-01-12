import SWRegister from "./components/SWRegister";
import "./globals.css";
import { Roboto } from "next/font/google";

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
      <body className={`${roboto.variable}`}>
        <main style={{ maxWidth: 960, margin: "0 auto", padding: "1rem" }}>
          <SWRegister />
        </main>
        {children}
      </body>
    </html>
  );
}
