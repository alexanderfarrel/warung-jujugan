"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Profile from "../icons/profile";
import Image from "next/image";
import { useState } from "react";
import CartIcon from "../icons/cart";
import Notification from "../icons/notification";
import useWindowWidth from "@/services/windowWidth/services";
import Spinner from "../ui/Spinner";
import dynamic from "next/dynamic";
import DarkModeButton from "../ui/DarkModeButton";
import HamburgerButton from "../ui/Hamburger";
import ListLink from "../ui/ListLink";
function Header() {
  const { data: session, status }: any = useSession();
  const [openMotion, setOpenMotion] = useState(false);
  let windowWidth = useWindowWidth();

  openMotion
    ? windowWidth > 640
      ? ""
      : (document.body.style.overflow = "hidden")
    : setTimeout(() => (document.body.style.overflow = "auto"), 500);

  if (status === "loading") {
    return (
      <motion.div
        animate={{ opacity: 1, top: 16 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="fixed left-0 right-0 -top-10 opacity-0 h-14 shadow-custom -m-4 z-40 bg-white flex items-center justify-center dark:bg-dark"
      >
        <header className="fixed max-w-4xl w-full bg-white flex items-center justify-between px-4 dark:bg-dark">
          <Link
            className="text-primary font-semibold text-2xl sm1:text-lg sm0:text-lg"
            href="/"
          >
            Warung Jujugan
          </Link>
          <aside className="font-semibold flex items-center justify-center dark:text-bright">
            Loading... <Spinner widthHeight="w-6 h-6 ml-2" primary />
          </aside>
        </header>
      </motion.div>
    );
  }
  const nick = session?.user?.username.split(" ")[0];
  const variants = {
    open: {
      clipPath:
        windowWidth < 800
          ? `circle(${window.innerHeight + 200}px at 350px 28px)`
          : `circle(${window.innerHeight + 200}px at 370px 28px)`,
      transition: {
        type: "spring",
        stiffness: 25,
      },
    },
    closed: {
      clipPath:
        windowWidth < 800
          ? windowWidth < 400
            ? `circle(18px at ${windowWidth - 30}px 28px)`
            : "circle(18px at 370px 28px)"
          : "circle(18px at 350px 28px)",
      transition: {
        delay: 0.8,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <motion.div
      animate={{ opacity: 1, top: 16 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed left-0 right-0 top-0 opacity-0 h-14 shadow-custom -m-4 z-40 bg-white flex items-center justify-center dark:bg-dark"
    >
      <header
        className={`fixed w-full bg-white flex items-center justify-between ${
          windowWidth < 800 ? "px-5" : "px-10"
        } dark:bg-dark`}
      >
        <Link
          className="text-primary font-semibold text-2xl sm1:text-lg sm0:text-lg"
          href="/"
        >
          Warung Jujugan
        </Link>
        <nav className="flex items-center justify-center gap-2 font-semibold text-gray">
          <>
            <DarkModeButton />
            <Link href="/status">
              <Notification
                className={`w-7 text-neutral-700 dark:text-bright`}
                session={session}
              />
            </Link>
            <Link href="/orders" className="mr-2">
              <CartIcon
                className={`cursor-pointer border-r-2 border-neutral-300 pr-3 relative text-neutral-700 dark:text-bright`}
                session={session}
              />
            </Link>
            {session && (
              <Link
                href={"/profile"}
                className="relative flex flex-col items-center group"
              >
                <div className="max-w-36 whitespace-nowrap flex gap-2 items-center p-1 rounded-lg hover:dark:bg-dark2 sm1:hidden sm0:hidden">
                  {session?.user?.image ? (
                    <>
                      <Image
                        src={session?.user?.image}
                        alt="profile"
                        className="w-8 h-8 min-w-8 rounded-full object-cover"
                        width={100}
                        height={100}
                      />
                      <div
                        className="w-14 h-6 absolute bg-gray flex justify-center items-center top-7 -left-2 opacity-0 rounded-lg before:content-[''] before:absolute before:w-0 before:h-0 before:border-[10px] 
                  before:border-gray before:border-t-transparent before:border-l-transparent before:border-b-[13px] before:border-r-transparent before:-top-5 group-hover:top-12 group-hover:opacity-100 transition-all duration-300"
                      >
                        <p className="text-white text-sm font-light">Profile</p>
                      </div>
                    </>
                  ) : (
                    <Profile classname="w-8 h-8" />
                  )}
                  <p className="text-xl text-ellipsis overflow-hidden mr-1 sm1:hidden sm0:hidden">
                    <span className="text-neutral-500 dark:text-bright">
                      {nick}
                    </span>
                  </p>
                </div>
              </Link>
            )}
            <motion.div className="" animate={openMotion ? "open" : "closed"}>
              <div
                className={`fixed top-0 left-0 right-0 bottom-0 ${
                  openMotion ? "" : "hidden"
                }`}
                onClick={() => setOpenMotion(false)}
              ></div>
              <motion.div
                className={`fixed top-0 right-0 bottom-0 h-full ${
                  windowWidth < 400 ? `w-full` : "w-[400px]"
                }  bg-secondary`}
                variants={variants}
              >
                <ListLink session={session} setOpenMotion={setOpenMotion} />
              </motion.div>
              <HamburgerButton
                setOpenMotion={setOpenMotion}
                openMotion={openMotion}
              />
            </motion.div>
          </>
        </nav>
      </header>
    </motion.div>
  );
}
export default dynamic(() => Promise.resolve(Header), { ssr: false });
