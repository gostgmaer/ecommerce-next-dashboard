import { AppProvider } from "@/context/contextAPi";
import "./globals.css";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { AuthContextProvider } from "@/context/authContext";
import { Suspense } from "react";
import Spinner from "@/components/global/element/loader/Spinner";
import { ToastContainer } from "react-toastify";
import NextAuthProvider from "@/context/sessionContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce Dashboard",
  description: "Created by kishor sarkar",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <AppProvider>
        <AuthContextProvider>
          <html lang="en">
            <body className={inter.className} suppressHydrationWarning={true}>
              <Suspense fallback={<Spinner></Spinner>}>
                <NextTopLoader />
                <main className="bg-light w-full min-h-screen text-dark">
                  {children}
                </main>
              </Suspense>
              <ToastContainer />
            </body>
          </html>
        </AuthContextProvider>
      </AppProvider></NextAuthProvider>
  );
}
