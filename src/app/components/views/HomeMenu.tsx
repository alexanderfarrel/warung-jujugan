"use client";
import Image from "next/image";
import MenuItem from "../layouts/menu/MenuItem";
import SectionHeaders from "../layouts/sectionHeaders/SectionHeaders";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FilterList from "../layouts/filter/filterList";
import FilterOrderHeading from "../layouts/filter/filterOrderHeading";
import { api } from "@/services/axios/axios";
import HomeMenuSkeleton from "./skeleton/HomeMenu/homeMenuSkeleton";

export default function HomeMenu() {
  const [dataMenu, setDataMenu] = useState([]);
  const [saring, setSaring] = useState<string>("Semua");
  const fetcher = async () => {
    const data = await api?.get("/api/menu");
    setDataMenu(data.data);
  };
  useEffect(() => {
    fetcher();
  }, []);
  const groupedOrders = dataMenu.reduce((grouped: any, order: any) => {
    const orderType = order.type || "default";
    grouped[orderType] = grouped[orderType] || [];
    grouped[orderType].push(order);
    return grouped;
  }, {});

  const Makanan = () => {
    return (
      <>
        <FilterOrderHeading infoType={"Makanan"}></FilterOrderHeading>
        <div className="grid grid-cols-3 gap-6 sm1:grid-cols-2 sm0:grid-cols-2">
          {groupedOrders["makanan"].map((menu: any) => (
            <MenuItem menu={menu} key={menu.name} />
          ))}
        </div>
      </>
    );
  };

  const Minuman = () => {
    return (
      <>
        <FilterOrderHeading infoType={"Minuman"}></FilterOrderHeading>
        <div className="grid grid-cols-3 gap-6 sm1:grid-cols-2 sm0:grid-cols-2">
          {groupedOrders["minuman"].map((menu: any) => (
            <MenuItem menu={menu} key={menu.name} />
          ))}
        </div>
      </>
    );
  };

  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <section className="relative" id="menu">
        <motion.div
          animate={{ x: 10, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 0.2 }}
          className="h-48 w-48 absolute opacity-0 -left-28 -top-12 -z-10"
        >
          <Image
            src="/images/sawi2.png"
            alt="salad"
            layout="fill"
            objectFit="contain"
          ></Image>
        </motion.div>
        <motion.div
          animate={{ x: -20, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 0.2 }}
          className="h-48 w-48 absolute -right-28 opacity-0 -top-12 -z-10"
        >
          <Image
            src="/images/sawi.png"
            alt="salad"
            layout="fill"
            objectFit="contain"
          ></Image>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 0.4 }}
          className="text-center pt-8 pb-3 opacity-0"
        >
          <SectionHeaders subHeader="Menu" mainHeader="Check out" />
        </motion.div>
        <FilterList
          list={["Semua", "Makanan", "Minuman"]}
          setSaring={setSaring}
          title="Filter By : "
          className="px-5"
        />
        <div className="flex flex-col gap-4 mt-4">
          {groupedOrders?.makanan?.length > 0 ||
          groupedOrders?.minuman?.length > 0 ? (
            <>
              {saring == "Semua" ? (
                <>
                  <Makanan />
                  <Minuman />
                </>
              ) : (
                <>{saring == "Makanan" ? <Makanan /> : <Minuman />}</>
              )}
            </>
          ) : (
            <HomeMenuSkeleton />
          )}
        </div>
      </section>
    </motion.div>
  );
}
