import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Moon from "../icons/moon";
import Sun from "../icons/sun";
export default function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const isDarkModeSaved = localStorage.getItem("isDarkMode");
    setIsDarkMode(isDarkModeSaved ? JSON.parse(isDarkModeSaved) : true);
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    document.querySelectorAll("*").forEach((item: any) => {
      item.classList.add("darkModeAnimation");
    });
    setTimeout(() => {
      document.querySelectorAll("*").forEach((item: any) => {
        item.classList.remove("darkModeAnimation");
      });
    }, 1000);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const variantsMoon = {
    visible: { scale: 1, rotate: 0 },
    hidden: { scale: 0, rotate: 180 },
  };
  const variantsSun = {
    visible: { scale: 1, rotate: 0, opacity: 1 },
    hidden: { scale: 0, rotate: 180 },
  };
  return (
    <button
      onClick={handleDarkMode}
      className={`relative w-8 h-8 flex items-center justify-center rounded-full dark:bg-dark2 outline-none transition-all duration-1000 ${
        isDarkMode
          ? "bg-dark2 shadow-inset-darkMode"
          : "bg-white shadow-inset-whiteMode"
      }`}
    >
      <motion.p
        variants={variantsMoon}
        transition={{ duration: 0.5, delay: isDarkMode ? 0.3 : 0 }}
        animate={isDarkMode ? "visible" : "hidden"}
        className="absolute text-xl"
      >
        <Moon className="w-6 text-bright" />
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        variants={variantsSun}
        transition={{ duration: 0.5, delay: isDarkMode ? 0 : 0.3 }}
        animate={isDarkMode ? "hidden" : "visible"}
        className="absolute text-xl"
      >
        <Sun />
      </motion.p>
    </button>
  );
}
