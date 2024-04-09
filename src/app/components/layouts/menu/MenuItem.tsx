"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import ModalMenuClick from "../modalLayouts/modalMenuClick";
import FormatToIDR from "@/services/formatter/formatToIDR";

export default function MenuItem(props: any) {
  const { menu, skeleton = false } = props;
  const [menuClick, setMenuClick] = useState("");
  const [width, setWidth] = useState<number>(0);
  const controls = useAnimation();
  useEffect(() => {
    controls.start("onscreen");
  }, [controls]);

  useEffect(() => {
    const div: HTMLElement | null = document.querySelector("[data-skeleton]");
    setWidth(Number(div?.offsetWidth));
  }, []);
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
        className={`relative bg-transparent shadow-custom p-4 rounded-2xl text-center flex flex-col items-center dark:bg-dark2`}
        data-container="menu"
      >
        {skeleton ? (
          <div
            className={`bg-neutral-500 mb-5 w-full ${
              width < 210 ? "h-44" : "h-60"
            } rounded-2xl animate-pulse`}
          />
        ) : (
          <>
            <div className="w-full h-52 sm0:h-40 flex justify-center items-center overflow-hidden">
              {menu?.thumbnail ? (
                <motion.img
                  variants={{
                    offscreen: { y: 100, opacity: 0 },
                    onscreen: {
                      y: 0,
                      opacity: 1,
                      transition: { type: "spring", duration: 1, delay: 0.1 },
                    },
                  }}
                  width={200}
                  height={200}
                  src={menu?.thumbnail}
                  alt={menu.name}
                  className="object-cover object-center"
                  loading="lazy"
                />
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
                  alt="sawi"
                />
              )}
            </div>
          </>
        )}
        {skeleton ? (
          <div
            className={`w-full ${width < 195 ? "px-9" : "px-14"} mb-4`}
            data-skeleton="bg-white"
          >
            <div className="bg-bright w-full h-6 animate-pulse rounded-lg"></div>
          </div>
        ) : (
          <div className="overflow-hidden pr-2">
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
          </div>
        )}
        {skeleton ? (
          <div className="w-full px-4">
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
            className="h-10 sm0:h-8 overflow-hidden"
          >
            <p className="text-gray cutoff-text text-sm sm0:text-[12px] h-10 sm0:leading-4 dark:text-neutral-400">
              {menu.subtitle}
            </p>
          </motion.div>
        )}
        {skeleton ? (
          <>
            <div
              className={`w-full ${width < 195 ? "px-9" : "px-14"}`}
              data-skeleton="bg-white"
            >
              <div className="bg-bright w-full h-6 animate-pulse rounded-lg"></div>
            </div>
            <button className="bg-primary w-full font-semibold mt-3 rounded-xl hover:bg-primary/80 sm0:h-6 h-10 animate-pulse"></button>
          </>
        ) : (
          <>
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
              <p className="py-2 font-semibold text-xl text-gray sm0:text-[18px] pb-12 dark:text-neutral-300">
                {FormatToIDR(menu.price)}
              </p>
            </motion.div>
            <div className="absolute w-full px-3 bottom-4">
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
            </div>
          </>
        )}
      </motion.div>
      {menuClick && (
        <ModalMenuClick setMenuClick={setMenuClick} menuClick={menuClick} />
      )}
    </>
  );
}
