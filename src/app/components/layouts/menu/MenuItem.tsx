"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import ModalMenuClick from "../modalLayouts/modalMenuClick";
import FormatToIDR from "@/services/formatter/formatToIDR";

export default function MenuItem(props: any) {
  const { menu, skeleton = false } = props;
  const [menuClick, setMenuClick] = useState("");
  const controls = useAnimation();
  useEffect(() => {
    controls.start("onscreen");
  }, [controls]);
  return (
    <>
      <motion.div
        key={menu}
        initial="offscreen"
        animate={controls}
        viewport={{ once: true, amount: 0 }}
        variants={{
          offscreen: { y: 100, opacity: 0 },
          onscreen: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", duration: skeleton ? 0 : 1.5 },
          },
        }}
        whileHover={{ scale: 1.05 }}
        id="box"
        className={`relative bg-transparent shadow-custom p-4 sm0:pb-[5.2rem] pb-24 rounded-2xl text-center flex flex-col items-center dark:bg-dark2`}
      >
        {skeleton ? (
          <div className="bg-neutral-500 mb-5 w-full h-60 rounded-2xl animate-pulse" />
        ) : (
          <motion.img
            variants={{
              offscreen: { y: 100, opacity: 0 },
              onscreen: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", duration: 1, delay: 0.1 },
              },
            }}
            src="/images/sawi.png"
            alt="soto"
          />
        )}
        <div className="overflow-hidden pr-2">
          {skeleton ? (
            <div className="bg-bright w-32 h-6 animate-pulse mx-auto mb-4 rounded-lg"></div>
          ) : (
            <motion.h4
              variants={{
                offSscreen: { opacity: 0 },
                onscreen: {
                  opacity: 1,
                  left: 0,
                  transition: { type: "spring", delay: 0.2 },
                },
              }}
              className="relative opacity-0 -left-16 font-semibold my-2 text-2xl sm0:text-xl dark:text-bright"
            >
              {menu.name}
            </motion.h4>
          )}
        </div>
        {skeleton ? (
          <div className="w-full px-6">
            <div className="bg-neutral-400 w-full h-16 animate-pulse mb-4 rounded-md"></div>
          </div>
        ) : (
          <motion.div
            variants={{
              offscreen: { opacity: 0, y: 30 },
              onscreen: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", delay: 0.4 },
              },
            }}
          >
            <p className="text-gray text-sm sm0:text-[12px] sm0:-mt-2 sm0:leading-4 dark:text-neutral-400">
              {menu.subtitle}
            </p>
          </motion.div>
        )}
        <div className="absolute w-full bottom-3 px-4">
          {skeleton ? (
            <div className="bg-neutral-300 w-32 h-6 animate-pulse mx-auto mb-5 rounded-full"></div>
          ) : (
            <motion.div
              variants={{
                offscreen: { opacity: 0, y: 10 },
                onscreen: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", delay: 0.6 },
                },
              }}
            >
              <p className="py-2 font-semibold text-xl text-gray sm0:text-[18px] dark:text-neutral-300">
                {FormatToIDR(menu.price)}
              </p>
            </motion.div>
          )}

          {skeleton ? (
            <button className="bg-primary w-full font-semibold text-bright dark:text-neutral-200 py-2 rounded-xl hover:bg-primary/80 sm0:py-1 sm0:text-sm h-10 animate-pulse"></button>
          ) : (
            <motion.button
              variants={{
                offscreen: { opacity: 0, x: -20 },
                onscreen: {
                  opacity: 1,
                  x: 0,
                  transition: { type: "spring", delay: 0.6 },
                },
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary w-full font-semibold text-bright dark:text-neutral-200 py-2 rounded-xl hover:bg-primary/80 sm0:py-1 sm0:text-sm"
              onClick={() => setMenuClick(menu)}
            >
              + Tambahkan
            </motion.button>
          )}
        </div>
      </motion.div>
      {menuClick && (
        <ModalMenuClick setMenuClick={setMenuClick} menuClick={menuClick} />
      )}
    </>
  );
}
