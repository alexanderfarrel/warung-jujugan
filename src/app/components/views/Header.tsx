"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import Profile from "../icons/profile";
import Image from "next/image";
import { useState } from "react";
import CartIcon from "../icons/cart";
import Notification from "../icons/notification";
import useWindowWidth from "@/services/windowWidth/services";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import dynamic from "next/dynamic";
import DarkModeButton from "../ui/DarkModeButton";
function Header() {
  const { data: session, status }: any = useSession();
  const [open, setOpen] = useState(false);
  let windowWidth = useWindowWidth();

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
          <nav className="flex gap-8 text-secondary font-semibold items-center sm2:hidden">
            <Link href="/">Menu</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
            {session?.user?.role === "admin" && (
              <Link href="/admin">Admin</Link>
            )}
          </nav>
          <aside className="font-semibold flex items-center justify-center dark:text-bright">
            Loading... <Spinner widthHeight="w-6 h-6 ml-2" primary />
          </aside>
        </header>
      </motion.div>
    );
  }
  const nama = session?.user?.username.split(" ")[0];

  return (
    <motion.div
      animate={{ opacity: 1, top: 16 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed left-0 right-0 top-0 opacity-0 h-14 shadow-custom -m-4 z-40 bg-white flex items-center justify-center dark:bg-dark"
    >
      <header
        className={`fixed w-full bg-white flex items-center justify-between ${
          windowWidth < 900 ? "px-3" : "px-10"
        } dark:bg-dark`}
      >
        <Link
          className="text-primary font-semibold text-2xl sm1:text-lg sm0:text-lg"
          href="/"
        >
          Warung Jujugan
        </Link>
        <nav className="flex gap-8 text-secondary font-semibold items-center sm2:hidden">
          <Link href="/#menu" className="hover:text-primary">
            Menu
          </Link>
          <Link href="/#about" className="hover:text-primary">
            About
          </Link>
          <Link href="/#contact" className="hover:text-primary">
            Contact
          </Link>
          {session?.user?.role === "admin" && (
            <Link href="/admin" className="hover:text-primary">
              Admin
            </Link>
          )}
        </nav>
        <nav className="flex items-center justify-center gap-3 font-semibold text-gray">
          {nama ? (
            <>
              <DarkModeButton />
              <Link href="/status">
                <Notification
                  className={`w-7 text-neutral-700 dark:text-bright`}
                  session={session}
                />
              </Link>
              <Link href="/orders" onClick={() => console.log("cart di klik")}>
                <CartIcon
                  className={`cursor-pointer border-r-2 border-neutral-300 pr-3 relative text-neutral-700 dark:text-bright`}
                  session={session}
                />
              </Link>
              <div className="max-w-36 whitespace-nowrap flex gap-2 items-center">
                {session.user.image ? (
                  <Link
                    href={"/profile"}
                    className="relative flex flex-col items-center group"
                  >
                    <Image
                      src={session.user.image}
                      alt="profile"
                      className="w-8 h-8 min-w-8 rounded-full object-cover"
                      width={100}
                      height={100}
                    />
                    <div
                      className="w-14 h-6 absolute bg-gray flex justify-center items-center top-7 opacity-0 rounded-lg before:content-[''] before:absolute before:w-0 before:h-0 before:border-[10px] 
                  before:border-gray before:border-t-transparent before:border-l-transparent before:border-b-[13px] before:border-r-transparent before:-top-5 group-hover:top-10 group-hover:opacity-100 transition-all duration-300"
                    >
                      <p className="text-white text-sm font-light">Profile</p>
                    </div>
                  </Link>
                ) : (
                  <Link href={"/profile"}>
                    <Profile classname="w-8 h-8" />
                  </Link>
                )}
                <p className="text-xl text-ellipsis overflow-hidden sm1:hidden sm0:hidden">
                  <span className="text-neutral-500 dark:text-bright">
                    {nama}
                  </span>
                </p>
              </div>
              {windowWidth < 850 && (
                <>
                  <div
                    className={`relative w-5 h-4 flex flex-col gap-5 justify-center items-center transition-all duration-500 ${
                      open && "z-50"
                    }`}
                    onClick={() => setOpen(!open)}
                  >
                    <span
                      className={`w-full h-[1px] ${
                        !open && "bg-black dark:bg-bright"
                      } absolute top-0 transition-all duration-300 ${
                        open &&
                        "origin-left rotate-45 translate-y-[1px] bg-white"
                      }`}
                    ></span>
                    <span
                      className={` h-[1px] ${
                        !open && "w-[80%] bg-black dark:bg-bright"
                      } absolute self-end transition-all duration-300 ${
                        open && "scale-0 bg-white origin-left"
                      }`}
                    ></span>
                    <span
                      className={`w-full h-[1px] ${
                        !open && "bg-black dark:bg-bright"
                      } absolute bottom-0 transition-all duration-300 ${
                        open && "-rotate-45 origin-left bg-white"
                      }`}
                    ></span>
                  </div>
                  <div
                    className={`${
                      !open && "hidden"
                    } absolute left-0 top-0 right-0 z-40 h-[100dvh] -m-3`}
                    onClick={() => setOpen(false)}
                  ></div>
                  <div
                    data-navbar="true"
                    className={`h-[100dvh] w-64 bg-gradient-to-r from-green-600 to-primary absolute -top-3 ${
                      !open && "-right-64"
                    } z-40 transition-all duration-300 flex flex-col items-center justify-center gap-10 ${
                      open && "right-[0] opacity-1"
                    }`}
                  >
                    <Link
                      href="/#menu"
                      className="text-white"
                      onClick={() => setOpen(false)}
                    >
                      Menu
                    </Link>
                    <Link
                      href="/#about"
                      className="text-white"
                      onClick={() => setOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/#contact"
                      className="text-white"
                      onClick={() => setOpen(false)}
                    >
                      Contact
                    </Link>
                    {session?.user?.role === "admin" && (
                      <Link
                        href="/admin"
                        className="text-white"
                        onClick={() => setOpen(false)}
                      >
                        Admin
                      </Link>
                    )}

                    <Button
                      onClick={() => signOut()}
                      className="text-white absolute bottom-10 rounded-xl"
                    >
                      Logout
                    </Button>
                  </div>
                </>
              )}
              <button
                onClick={() => signOut()}
                className=" text-primary px-2 py-1 hover:text-secondary transition-all duration-300 sm2:hidden dark:hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <DarkModeButton />
                <button
                  className="rounded-2xl text-primary"
                  onClick={() => signIn()}
                >
                  Login
                </button>
                <Link
                  href="/auth/register"
                  className="bg-primary text-white px-3 py-1 rounded-xl sm1:px-2 sm1:py-1 sm1:rounded-xl sm0:px-2 sm0:py-1 sm0:rounded-xl"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </nav>
      </header>
    </motion.div>
  );
}
export default dynamic(() => Promise.resolve(Header), { ssr: false });
