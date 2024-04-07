import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TriangleBottom from "../../icons/triangleBottom";
export default function FilterList({
  list,
  setSaring,
  title,
  className,
  setDataSaring,
  dataSaring,
}: {
  list: any;
  setSaring: any;
  title: string;
  className?: string;
  setDataSaring?: any;
  dataSaring?: any;
}) {
  const [filter, setFilter] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string>("");
  const [arrowAnimate, setArrowAnimate] = useState<string>("");
  const [subList, setSubList] = useState<any>({});

  useEffect(() => {
    let newFilter: any = {};
    list.forEach((item: any) => {
      if (typeof item === "object") {
        const key = Object.keys(item)[0];
        const values = item[key];
        const updatedSubList = values.reduce((acc: any, q: any) => {
          if (q == "Semua") {
            return { ...acc, [q]: true };
          }
          return { ...acc, [q]: false };
        }, subList);
        setSubList(updatedSubList);
        newFilter = {
          ...newFilter,
          [key]: false,
        };
      } else {
        newFilter = {
          ...newFilter,
          [item]: false,
        };
      }
    });
    const firstKey = Object.keys(newFilter)[0];
    if (firstKey !== undefined) {
      newFilter[firstKey] = true;
    }
    setFilter(newFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = (item: string, info: string) => {
    if (open && info != "object") {
      setTimeout(() => setOpen(false), 300),
        setAnimate("animate-unVisibleList"),
        setArrowAnimate("rotate-0");
    }
    if (info === "object") {
      !open
        ? (setOpen(true),
          setAnimate("animate-visibleDownList"),
          setArrowAnimate("rotate-180"))
        : (setTimeout(() => setOpen(false), 300),
          setAnimate("animate-unVisibleList"),
          setArrowAnimate("rotate-0"));
    }
    let trueTemporarry: any;
    for (const key in filter) {
      if (filter[key]) {
        trueTemporarry = key;
      }
    }
    if (trueTemporarry === item) {
      return;
    }
    setSaring(item);
    setFilter({
      ...filter,
      [item]: true,
      [trueTemporarry]: false,
    });
  };

  const handleSubClick = (item: string) => {
    item == "Menunggu"
      ? setDataSaring("Menunggu Konfirmasi")
      : setDataSaring(item);
    let trueTemporarry: any;
    for (const key in subList) {
      if (subList[key]) {
        trueTemporarry = key;
      }
    }
    if (trueTemporarry === item) {
      return (
        setTimeout(
          () => (
            setAnimate("animate-unVisibleList"), setArrowAnimate("rotate-0")
          ),
          200
        ),
        setTimeout(() => setOpen(false), 500)
      );
    }
    setSubList({
      ...subList,
      [item]: true,
      [trueTemporarry]: false,
    });
    setTimeout(
      () => (setAnimate("animate-unVisibleList"), setArrowAnimate("rotate-0")),
      200
    ),
      setTimeout(() => setOpen(false), 500);
  };
  return (
    <motion.div
      animate={{ opacity: 1, x: 50 }}
      transition={{ ease: "easeInOut", duration: 0.4, delay: 0.4 }}
      className={`flex items-center z-10 opacity-0 relative -left-12 ${className}`}
    >
      <p className="whitespace-nowrap sm0:text-[13px] dark:text-bright">
        {title}
      </p>
      <ul
        className={`flex gap-2 ml-2 cursor-pointer items-center hide-scrollbar ${
          !open && "overflow-x-scroll overflow-y-hidden"
        }`}
      >
        {list &&
          list.map((item: any, index: number) => {
            const itemName =
              typeof item === "object" ? Object.keys(item)[0] : item;
            return (
              <>
                {typeof item === "object" ? (
                  <>
                    <div className="relative">
                      <motion.li
                        key={index}
                        animate={{ opacity: 1, x: (index + 1) * 40 }}
                        transition={{
                          ease: "easeInOut",
                          duration: 0.5,
                          delay: 0.4 + index * 0.2,
                        }}
                        className={`px-2 py-1 border-2 ${
                          filter[itemName] === true
                            ? "border-primary text-primary"
                            : "border-neutral-400 text-neutral-600"
                        } rounded-full opacity-0 relative sm1:text-[13px] sm0:text-[13px] flex gap-1 items-center dark:text-bright`}
                        style={{
                          left: `-${(index + 1) * 40}px`,
                        }}
                        onClick={() => handleClick(itemName, "object")}
                      >
                        {dataSaring != "Semua"
                          ? dataSaring.split(" ")[0]
                          : itemName}{" "}
                        <TriangleBottom
                          className={`w-4 h-4 ${arrowAnimate} transition-all duration-300 dark:text-bright`}
                        />
                      </motion.li>
                      <div
                        className={`absolute ${
                          open ? "flex" : "hidden"
                        }  flex-col bg-white ${animate} rounded-lg top-full gap-1 mt-1  left-0 overflow-y-scroll hide-scrollbar dark:bg-dark`}
                      >
                        {item[itemName].map((item: any, index: number) => (
                          <span
                            key={index}
                            className={`${
                              subList[item]
                                ? "text-green-500"
                                : "dark:text-bright"
                            } sm1:text-sm sm0:text-sm`}
                            onClick={() => handleSubClick(item)}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <motion.li
                    key={index}
                    animate={{ opacity: 1, x: (index + 1) * 40 }}
                    transition={{
                      ease: "easeInOut",
                      duration: 0.5,
                      delay: 0.4 + index * 0.2,
                    }}
                    className={`px-2 py-1 border-2 ${
                      filter[itemName] === true
                        ? "border-primary text-primary"
                        : "border-neutral-400 text-neutral-600 dark:border-neutral-400 dark:text-bright"
                    } rounded-full opacity-0 relative sm1:text-[13px] sm0:text-[13px]`}
                    style={{
                      left: `-${(index + 1) * 40}px`,
                    }}
                    onClick={() => handleClick(itemName, "string")}
                  >
                    {itemName}
                  </motion.li>
                )}
              </>
            );
          })}
      </ul>
    </motion.div>
  );
}
