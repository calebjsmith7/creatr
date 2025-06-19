// src/app/layout.js
import "./globals.css";
import UpperNav from "./components/UpperNav";
import { Providers } from "./providers"; // ← our new client wrapper

export const metadata = {
  title: "Creatr",
  description: "Demo Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <UpperNav>{children}</UpperNav>
        </Providers>
      </body>
    </html>
  );
}
