import Modal from "../../ui/modal";
import Image from "next/image";
import Button from "../../ui/Button";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import FormatToIDR from "@/services/formatter/formatToIDR";
import { notifOrder, notifStatus } from "@/app/redux/store";
import { useDispatch } from "react-redux";

export default function ModalOrderConfirm(props: any) {
  const { menuConfirm, setMenuConfirm, sum, sumBarang, session } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState("");
  const [closed, setClosed] = useState<boolean>(false);
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    window.addEventListener("keydown", () => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    });
  }, []);
  const handleTextArea = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      handleConfirm(menuConfirm);
    }
  };

  const handleConfirm = (menu: any) => {
    if (menu.length < 1) {
      return toast.error("Tidak ada menu yang dipilih");
    }

    const savingPromise = new Promise(async (resolve, reject) => {
      setIsLoading(true);
      try {
        const result: any = await fetch("/api/profile/orderConfirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            id: session?.user?.id,
            menu: menu,
            note: note.length > 0 ? note : "",
          }),
        });
        const res = await result.json();
        if (res.status) {
          dispatch(notifOrder());
          dispatch(notifStatus());
          setIsLoading(false);
          setClosed(true);
          resolve(res);
        } else {
          setIsLoading(false);
          setClosed(true);
          reject();
        }
      } catch (err) {
        reject();
        console.log(err);
      }
    });
    toast.promise(savingPromise, {
      loading: "Loading",
      success: "Success",
      error: "Failed",
    });
  };
  return (
    <Modal onClose={() => setMenuConfirm("")} closed={closed}>
      <h1 className="font-semibold text-xl mb-2 dark:text-bright">Pesanan</h1>
      <div className="max-h-72 overflow-y-auto pr-4 mini-scrollbar">
        {menuConfirm.map((order: any, index: any) => (
          <>
            <div key={index} className="flex gap-3 mb-1">
              <div className="w-20 h-20 flex justify-center items-center overflow-hidden">
                {order.note != "nothing" ? (
                  <Image
                    src={order.topingChecked[0].display}
                    alt="sawi"
                    width={80}
                    height={80}
                    className="object-center object-cover"
                  />
                ) : (
                  <Image
                    src={order.topingChecked[0].thumbnail}
                    alt="sawi"
                    width={80}
                    height={80}
                    className="object-center object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="font-medium dark:text-neutral-200">
                  {order.name}
                </h3>
                <p className="text-white">
                  {order.note == "nothing" &&
                  order.topingChecked[0].disabled !== true
                    ? "(" +
                      order.topingChecked
                        .map((toping: any) => {
                          return toping.checked !== true ? toping.name : "";
                        })
                        .join(", ") +
                      ")"
                    : ""}
                </p>
                <p className="font-semibold dark:text-neutral-300">
                  {order.note == "nothing" ? (
                    <>
                      {FormatToIDR(order.totalPrice / order.count)}{" "}
                      <span className="font-normal">x {order.count}</span>
                    </>
                  ) : (
                    <>
                      {FormatToIDR(order.topingChecked[0].price)}{" "}
                      <span className="font-normal">x {order.count}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
      <textarea
        ref={textAreaRef}
        className=" w-full mt-2 py-1 px-2 rounded-xl focus:shadow-thin outline-none text-slate-600 mini-scrollbar transition-shadow duration-200 dark:bg-dark2 dark:placeholder:text-neutral-400 dark:text-neutral-300"
        placeholder="Catatan Untuk Penjual"
        name="note"
        id="note"
        onKeyDown={(e) => handleTextArea(e)}
        onChange={(e) => setNote(e.target.value)}
        value={note}
      ></textarea>
      <div className="flex justify-between px-2 mt-2 items-center gap-2">
        <h2 className="text-neutral-500 text-[15px] dark:text-neutral-300">{`Total Harga (${sumBarang} Pesanan)`}</h2>
        <p className="font-semibold dark:text-bright">{FormatToIDR(sum)}</p>
      </div>
      <Button
        onClick={() => handleConfirm(menuConfirm)}
        className="w-full bg-secondary hover:bg-secondary/80 text-white rounded-xl mt-2 disabled:bg-secondary/50"
        disabled={isLoading}
      >
        Buat Pesanan
      </Button>
    </Modal>
  );
}
