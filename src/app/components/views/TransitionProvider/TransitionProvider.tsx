import { AnimatePresence } from "framer-motion";
import Header from "../Header";
import { motion } from "framer-motion";
import useWindowWidth from "@/services/windowWidth/services";

export default function TransitionProvider({
  children,
  pathname,
  disableNavbar,
}: any) {
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
  return (
    <AnimatePresence key={`${pathname} - ${title}`} mode="wait">
      <div key={`${pathname}`} className="w-full overflow-hidden">
        {!disableNavbar.includes(pathname.split("/")[1]) && <Header />}
        <motion.div
          className={`w-[100dvw] h-[100dvh] fixed bg-secondary ${
            windowWidth < 640 ? "rounded-b-[50px]" : "rounded-b-[100px]"
          } z-40`}
          initial={{ height: "0dvh" }}
          animate={{ height: "0dvh" }}
          exit={{ height: "140dvh" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <motion.div
          className="fixed m-auto left-0 top-0 bottom-0 right-0 text-white text-8xl z-50 cursor-default w-fit h-fit capitalize sm1:text-5xl sm0:text-5xl"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            display: "none",
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            display: { delay: 0.8 },
          }}
        >
          {title}
        </motion.div>
        <motion.div
          className={`w-[100dvw] h-[100dvh] fixed bg-secondary ${
            windowWidth < 640 ? "rounded-t-[50px]" : "rounded-t-[100px]"
          } bottom-0 z-40`}
          initial={{ height: "140dvh" }}
          animate={{
            height: "0dvh",
            transition: { delay: 0.5, duration: 0.5 },
          }}
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
