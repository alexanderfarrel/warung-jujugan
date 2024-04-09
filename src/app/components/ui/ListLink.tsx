import { motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Profile from "../icons/profile";
import LogoutIcon from "../icons/logout";
import { useRouter } from "next/navigation";

const variants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      staggerDirection: -1,
    },
  },
};
const Itemvariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const buttonVariantsLeft = {
  open: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.8 },
  },
  closed: {
    x: -50,
    opacity: 0,
  },
};

const buttonVariantsRight = {
  open: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.8 },
  },
  closed: {
    x: 50,
    opacity: 0,
  },
};

const profileVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2 },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { delay: 0.4 },
  },
};

export default function ListLink({ session, setOpenMotion }: any) {
  const items = ["menu", "about", "contact"];
  session?.user?.role == "admin" && items.push("admin");
  const { push } = useRouter();
  return (
    <>
      <div className="flex flex-col items-center relative h-full">
        {session ? (
          <Link
            href={"/profile"}
            className="absolute hidden  top-20 sm1:flex sm0:flex flex-col items-center group hover:bg-neutral-400 hover:border-neutral-400 transition-all duration-200"
            onClick={() => setOpenMotion(false)}
          >
            <motion.div
              variants={profileVariants}
              className="border border-neutral-200 p-1 rounded-xl"
            >
              <div className="whitespace-nowrap flex gap-2 items-center p-1 rounded-lg">
                {session?.user?.image ? (
                  <>
                    <Image
                      src={session?.user?.image}
                      alt="profile"
                      className="w-8 h-8 min-w-8 rounded-full object-cover"
                      width={100}
                      height={100}
                    />
                  </>
                ) : (
                  <Profile classname="w-8 h-8" />
                )}
                <p className="text-xl text-ellipsis overflow-hidden mr-1">
                  <span className="text-neutral-500 dark:text-bright">
                    {session?.user?.username}
                  </span>
                </p>
              </div>
            </motion.div>
          </Link>
        ) : (
          <div className="absolute bottom-20 flex gap-5">
            <motion.button
              className="flex bg-primary px-3 py-1 rounded-lg items-center gap-1 text-white font-thin text-2xl pb-1 sm1:text-xl sm0:text-xl"
              onClick={() => signIn()}
              variants={buttonVariantsLeft}
            >
              Masuk
            </motion.button>
            <motion.button
              className="flex bg-white px-3 py-1 rounded-lg items-center gap-1 text-primary font-thin text-2xl pb-1 sm1:text-xl sm0:text-xl"
              onClick={() => push("/auth/register")}
              variants={buttonVariantsRight}
            >
              Daftar
            </motion.button>
          </div>
        )}
        <motion.div
          variants={variants}
          className="flex flex-col font-thin gap-10 h-full justify-center items-center"
        >
          {items.map((item) => (
            <motion.a
              key={item}
              href={item == "admin" ? "/admin" : `/#${item.toLowerCase()}`}
              variants={Itemvariants}
              onClick={() => setOpenMotion(false)}
              className="text-white capitalize text-5xl sm1:text-4xl sm0:text-4xl"
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
        {session != undefined && (
          <motion.button
            className="flex items-center gap-1 text-white font-thin absolute bottom-10 text-2xl pb-1 sm1:text-xl sm0:text-xl"
            onClick={() => signOut()}
            variants={buttonVariantsRight}
          >
            <LogoutIcon /> Keluar Akun
          </motion.button>
        )}
      </div>
    </>
  );
}
