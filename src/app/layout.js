import "./globals.css";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce Dashboard",
  description: "Created by kishor sarkar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <main>{children}</main>
      </body>
    </html>
  );
}
