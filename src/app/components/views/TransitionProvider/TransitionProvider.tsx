import { AnimatePresence } from "framer-motion";
import Header from "../Header";
import { motion } from "framer-motion";
import useWindowWidth from "@/services/windowWidth/services";
import { useEffect, useState } from "react";

export default function TransitionProvider({
  children,
  pathname,
  disableNavbar,
}: any) {
  const [isClient, setIsClient] = useState(false);
  const path = pathname.split("/")[1];
  const title =
    path == ""
      ? "Menu"
      : path == "/orders"
      ? "Orders"
      : path == "status"
      ? "Status Orders"
      : path == "admin"
      ? "Admin Panel"
      : path == "auth"
      ? pathname.split("/")[2]
      : path;
  const windowWidth = useWindowWidth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <AnimatePresence key={`${pathname} - ${path}`} mode="wait">
      <div key={`${pathname} - ${title}`} className="w-full overflow-hidden">
        {!disableNavbar.includes(pathname.split("/")[1]) && <Header />}
        <motion.div
          className={`w-[100dvw] h-[100dvh] fixed hidden bg-secondary ${
            windowWidth < 640 ? "rounded-t-[35px]" : "rounded-t-[80px]"
          } bottom-0 z-40`}
          initial={{ height: "140dvh" }}
          animate={{
            display: "block",
            height: "0dvh",
            transition: {
              delay: 0.8,
              duration: 0.5,
              display: { delay: 0.8 },
            },
          }}
          exit={{ height: "0dvh" }}
        />
        <motion.div
          className="fixed m-auto left-0 top-0 bottom-0 right-0 text-white text-6xl z-50 cursor-default w-fit h-fit capitalize sm1:text-5xl sm0:text-5xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            display: "none",
          }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.3,
            ease: "easeInOut",
            display: { delay: 0.9 },
          }}
        >
          {title}
        </motion.div>
        <motion.div
          className={`w-[100dvw] h-[100dvh] fixed bg-secondary ${
            windowWidth < 640 ? "rounded-b-[35px]" : "rounded-b-[80px]"
          } top-0 z-40`}
          initial={{ height: "0dvh" }}
          animate={{
            height: "140dvh",
            display: "none",
            transition: { duration: 0.8, display: { delay: 0.8 } },
          }}
          exit={{ height: "140dvh" }}
        />
        <main className="max-w-4xl px-4 mx-auto">
          {children}
          <footer className="p-8 text-center text-gray mt-16 dark:text-neutral-400">
            &copy; 2023 All rights reserved
          </footer>
        </main>
      </div>
    </AnimatePresence>
  );
}
