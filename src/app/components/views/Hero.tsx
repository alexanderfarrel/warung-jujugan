"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import useWindowWidth from "@/services/windowWidth/services";
import dynamic from "next/dynamic";

function Hero() {
  let windowWidth = useWindowWidth();
  return (
    <>
      <motion.div
        className="h-100dvh"
        initial={{ y: "-200dvh" }}
        animate={{ y: "0dvh" }}
        transition={{ duration: 1 }}
      >
        <section className=" grid grid-cols-2 mt-12 place-items-center">
          {typeof window != "undefined" && (
            <>
              <motion.div
                animate={{ opacity: 1, marginLeft: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="py-8 opacity-0 -ml-5"
              >
                <h1 className="text-4xl font-semibold sm0:text-3xl dark:text-[#eeeeee]">
                  {"Everything Feels Better After You're Full"}
                </h1>
                {windowWidth > 640 && (
                  <>
                    <p className="my-4 text-gray dark:text-neutral-300">
                      Manjakan perutmu dengan aneka makanan dan minuman di
                      Warung Jujugan
                    </p>
                  </>
                )}
              </motion.div>
              <motion.div
                animate={{ opacity: 1, marginRight: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="relative grid justify-end -mr-5 opacity-0"
              >
                <Image
                  className=""
                  src={"/logo/jujugan2.png"}
                  alt="Warung Jujugan Logo"
                  width={250}
                  height={250}
                ></Image>
              </motion.div>
            </>
          )}
        </section>
        {windowWidth <= 640 && (
          <section className="mb-10">
            <p className="mb-4 -mt-4 text-gray dark:text-bright">
              Manjakan perutmu dengan aneka makanan dan minuman di Warung
              Jujugan
            </p>
          </section>
        )}
      </motion.div>
    </>
  );
}
export default dynamic(() => Promise.resolve(Hero), { ssr: false });
