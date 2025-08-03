import Image from "next/image";
import Modal from "../../ui/modal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Counting from "../../ui/Counting";
import generateRandomId from "@/services/RandomID/RandomID";
import FormatToIDR from "@/services/formatter/formatToIDR";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { notifOrder } from "@/app/redux/notificationSlice";
import { api } from "@/services/axios/axios";

export default function ModalMenuClick(props: any) {
  const { setMenuClick, menuClick } = props;
  const { data: session }: any = useSession();
  const [dataOrder, setDataOrder] = useState<any>(menuClick);
  const [count, setCount] = useState(1);
  const [resultPrice, setResultPrice] = useState(0);
  const [priceToping, setPriceToping] = useState(0);
  const [perbarui, setPerbarui] = useState(false);
  const [topingChecked, setTopingChecked] = useState<string[]>([]);
  const [hargaUtama, setHargaUtama] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [closed, setClosed] = useState<boolean>(false);
  const [urlDisplay, setUrlDisplay] = useState<string>("");
  const [maxCount, setMaxCount] = useState(3);
  const dispatch = useDispatch();
  const router = useRouter();

  const getUserOrder = async () => {
    const res = await api.get(`/api/users/getorders?id=${session?.user?.id}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (res.status === 200) {
      const copiedData = JSON.parse(JSON.stringify(menuClick));
      copiedData.choice.forEach((choice: any) => {
        res.data.data.orders.forEach((order: any) => {
          if (order.note === "choiceOne") {
            if (choice.name === order.name) {
              choice.stock -= order.count;
            }
          } else {
            order.topingChecked.forEach((item: any) => {
              if (choice.name === item.name) {
                choice.stock -= order.count;
              }
            });
          }
        });
      });
      setTopingChecked([copiedData.choice[0]]);
      setDataOrder(copiedData);
    }
  };

  useEffect(() => {
    findUrl(menuClick.choice[0].name);
    setTopingChecked([menuClick.choice[0]]);
    getUserOrder();
  }, []);

  useEffect(() => {
    const jalanin = () => {
      const minStock = Math.min(
        ...topingChecked.map((item: any) => item.stock)
      );
      setMaxCount(minStock);
      if (menuClick.choice[0].type === "checkbox") {
        setHargaUtama(menuClick.price);
      }
      if (menuClick.choice[0].type === "radio") {
        if (hargaUtama === 0) {
          setHargaUtama(menuClick.choice[0].price);
        }
      }
      if (priceToping > 0) {
        const price = hargaUtama * count + priceToping * count;
        setResultPrice(price);
      } else {
        const price = hargaUtama * count;
        setResultPrice(price);
      }
      setPerbarui(false);
    };
    jalanin();
  }, [
    priceToping,
    count,
    menuClick.price,
    perbarui,
    hargaUtama,
    menuClick.choice,
    topingChecked,
  ]);

  const handleAddTopingRadio = (choice: any) => {
    findUrl(choice.name);
    const input = document.getElementById(choice.name) as HTMLInputElement;
    if (input.checked) {
      setTopingChecked([choice]);
      if (hargaUtama === choice.price) {
        setPerbarui(true);
      }
      setHargaUtama(choice.price);
    }
  };

  const handleAddTopingCheckbox = (choice: any) => {
    const input = document.getElementById(choice.name) as HTMLInputElement;
    if (input.checked) {
      setHargaUtama(menuClick.price);
      setTopingChecked((prev) => [...prev, choice]);
      if (priceToping == 0) {
        setPriceToping(Number(choice.price));
      } else {
        setPriceToping(priceToping + Number(choice.price));
      }
    } else {
      setTopingChecked(
        topingChecked.filter((item: any) => item.name !== choice.name)
      );
      setPriceToping(priceToping - choice.price);
    }
  };

  const handleResult = async () => {
    if (session == null) {
      router.push("/auth/login");
      return toast.error("Silahkan login terlebih dahulu");
    }
    if (count > maxCount) return toast.error("Stok tidak mencukupi");
    setIsLoading(true);
    let selectedTopping =
      topingChecked.length > 0 ? topingChecked : [menuClick.choice[0]];
    let name;
    if (menuClick.note === "choiceOne") {
      name = selectedTopping[0].name;
    } else {
      name = menuClick.name;
    }
    let id = generateRandomId();
    const dataResult = {
      id,
      type: menuClick.type,
      name,
      count,
      realName: menuClick.name,
      price: menuClick.price,
      totalPrice: resultPrice,
      topingChecked: selectedTopping,
      note: menuClick.note,
    };

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        setClosed(true);
        const result: any = await fetch("/api/profile/order", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            dataResult,
            email: session?.user?.email,
          }),
        });
        const res = await result.json();
        if (res.status === true) {
          dispatch(notifOrder());
          setIsLoading(false);
          resolve(res);
        }
        if (res.result.statusCode === 204) {
          dispatch(notifOrder());
          toast.success("berhasil menambah jumlah pesanan");
        } else {
          setIsLoading(false);
          reject();
        }
      } catch (err) {
        console.log(err);
        reject();
      }
    });
    toast.promise(savingPromise, {
      loading: "Menambah pesanan..",
      success: "Pesanan Berhasil Ditambahkan",
      error: "Pesanan Gagal Ditambahkan",
    });
  };
  const findUrl = (name: string) => {
    const url = menuClick?.choice?.find(
      (item: any) => item.name === name
    )?.display;
    if (url) {
      setUrlDisplay(url);
    } else {
      return;
    }
  };

  return (
    <Modal
      className="w-full max-w-[18rem]"
      onClose={() => setMenuClick("")}
      closed={closed}
    >
      <div className={`max-h-[650px] overflow-y-auto hide-scrollbar`}>
        <h1 className="font-bold text-3xl dark:text-bright sm0:text-2xl mb-3">
          {dataOrder.name}
        </h1>
        <div className="flex justify-center items-center w-full h-36 overflow-hidden mb-2">
          {dataOrder.thumbnail ? (
            <Image
              src={urlDisplay}
              alt={menuClick.name}
              width={150}
              height={150}
              className="object-cover object-center"
            ></Image>
          ) : (
            <Image
              src="/images/sawi.png"
              alt="sawi"
              width={200}
              height={200}
              className="object-cover object-center"
            ></Image>
          )}
        </div>
        <div className="flex mb-5 h-12 overflow-y-scroll mini-scrollbar dark:bg-dark2 px-1 rounded-lg">
          <h4 className="dark:text-neutral-300">{menuClick.desc}</h4>
        </div>
        {dataOrder?.choice?.map((choice: any, i: number) => (
          <div key={choice.name} className="mb-2 relative">
            <label
              htmlFor={choice.name}
              className={`border-2 border-secondary ${
                (document.getElementById(choice.name) as HTMLInputElement)
                  ?.checked
                  ? "bg-secondary text-bright"
                  : "text-neutral-700"
              } w-full rounded-xl px-2 ${
                (document.getElementById(choice.name) as HTMLInputElement)
                  ?.checked
                  ? "pb-[14px]"
                  : "pb-[0px]"
              } relative cursor-pointer font-medium dark:text-bright capitalize transition-all duration-500 flex flex-col`}
            >
              <div className="self-start">
                {choice.name}{" "}
                <span
                  className={`ml-3 dark:text-neutral-200 ${
                    (document.getElementById(choice.name) as HTMLInputElement)
                      ?.checked
                      ? "text-neutral-100"
                      : "text-neutral-500"
                  } text-[14px]`}
                >
                  {choice.price == 0
                    ? choice.priceDisplay
                      ? `${FormatToIDR(choice.priceDisplay)}`
                      : ""
                    : choice.type === "radio"
                    ? `${FormatToIDR(choice.price)}`
                    : `+ ${FormatToIDR(choice.price)}`}
                </span>
              </div>
            </label>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{
                opacity: (
                  document.getElementById(choice.name) as HTMLInputElement
                )?.checked
                  ? 1
                  : 0,
              }}
              transition={{
                duration: 0.2,
                delay: (
                  document.getElementById(choice.name) as HTMLInputElement
                )?.checked
                  ? 0.4
                  : 0,
              }}
              className={`text-sm sm0:text-[11px] dark:text-bright absolute bottom-0 left-3`}
            >
              Stock : {choice.stock}
            </motion.span>

            {choice.type === "radio" ? (
              <input
                type="radio"
                id={choice.name}
                name="options"
                className="hidden"
                defaultChecked={choice.checked}
                onClick={() => handleAddTopingRadio(choice)}
              />
            ) : (
              <input
                type="checkbox"
                id={choice.name}
                disabled={choice.checked}
                defaultChecked={choice.checked}
                name="options"
                className="hidden"
                onClick={() => handleAddTopingCheckbox(choice)}
              />
            )}
          </div>
        ))}
        <div className="flex mt-3 items-center justify-between">
          <div className="flex gap-2 flex-col self-start">
            <Counting
              maxCount={maxCount}
              count={count}
              setCount={setCount}
              className="self-start"
            />
            {count > maxCount && (
              <p className="text-red-500 text-sm -mt-1">Stock Habis!</p>
            )}
          </div>
          <div className="relative">
            <h2 className="dark:text-bright">Total Price :</h2>
            {topingChecked?.map((choice: any, i: number) => (
              <div key={i} className={`${i === 0 ? "" : "absolute"}`}>
                {(document.getElementById(choice.name) as HTMLInputElement)
                  ?.checked && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      marginTop: (i > 1 ? (i - 1) * 22 : 0) - 10,
                    }}
                    animate={{
                      opacity: (document.getElementById(
                        choice.name
                      ) as HTMLInputElement)
                        ? 1
                        : 0,
                      marginTop: i > 1 ? (i - 1) * 22 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="text-[15px] text-zinc-800 opacity-[0.8] dark:text-bright"
                  >
                    +{" "}
                    {choice.price == 0
                      ? FormatToIDR(menuClick.price * count)
                      : FormatToIDR(choice.price * count)}
                  </motion.p>
                )}
              </div>
            ))}
            <motion.h3
              initial={{ marginTop: 0 }}
              animate={{ marginTop: (topingChecked.length - 1) * 22 }}
              transition={{ duration: 0.5 }}
              className="dark:text-bright font-medium"
            >
              {FormatToIDR(resultPrice)}
            </motion.h3>
          </div>
        </div>
        <div className="max-w-36">
          <button
            onClick={() => handleResult()}
            disabled={isLoading}
            className="bg-secondary text-white rounded-xl mt-2 hover:bg-secondary/80 transition-all duration-300 py-2 px-4 w-full disabled:bg-secondary/50"
          >
            Tambahkan
          </button>
        </div>
      </div>
    </Modal>
  );
}
