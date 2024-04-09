"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import useWindowWidth from "@/services/windowWidth/services";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";
import TransitionProvider from "./components/views/TransitionProvider/TransitionProvider";
import Head from "next/head";
import HeadLayout from "./components/layouts/HeadLayout/HeadLayout";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const disableNavbar = ["auth"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const isDarkModeSaved = localStorage.getItem("isDarkMode");
    setIsDarkMode(isDarkModeSaved ? JSON.parse(isDarkModeSaved) : true);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  const pathname = usePathname();

  let windowWidth = useWindowWidth();
  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <Head>
        <HeadLayout />
      </Head>
      <body className={`${roboto.className} dark:bg-dark`}>
        <SessionProvider>
          <Provider store={store}>
            <Toaster
              position={`${
                windowWidth && windowWidth < 850 ? "bottom-right" : "top-right"
              }`}
              containerStyle={{
                top: windowWidth && windowWidth < 850 ? 20 : 60,
                left: 20,
                bottom:
                  windowWidth && windowWidth < 850
                    ? pathname != "/orders"
                      ? 20
                      : 70
                    : 20,
                right: 20,
              }}
              toastOptions={{
                style: {
                  background: isDarkMode ? "#313944" : "#fff",
                  color: isDarkMode ? "#fff" : "black",
                },
              }}
              reverseOrder={false}
            />
            <TransitionProvider
              disableNavbar={disableNavbar}
              pathname={pathname}
            >
              {children}
            </TransitionProvider>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
