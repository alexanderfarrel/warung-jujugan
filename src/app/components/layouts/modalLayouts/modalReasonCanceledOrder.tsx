import { useState } from "react";
import Modal from "../../ui/modal";
import toast from "react-hot-toast";

export default function ModalReasonCanceledOrder({
  setOrderDelete,
  orderDelete,
  token,
  getData,
}: {
  setOrderDelete: any;
  orderDelete: any;
  token: string;
  getData?: any;
}) {
  const [closed, setClosed] = useState<boolean>(false);
  const [clicked, setClicked] = useState<any>("");
  const [animate, setAnimate] = useState<string>("animate-unVisibleDownReason");
  const [reason, setReason] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOptionChange = (e: any) => {
    setClicked(e.target.innerText);
    if (e.target.innerText === "Lainnya") {
      setAnimate("animate-visibleDownReason");
    } else {
      setAnimate("animate-unVisibleDownReason");
    }
  };
  const handleConfirm = () => {
    if (clicked.length == 0) {
      return toast.error("Pilih Alasan Membatalkan Order");
    } else if (clicked == "Lainnya") {
      if (reason.length == 0) {
        return toast.error("Masukkan Alasan Membatalkan Order");
      }
      orderDelete.adminRejectNote = reason;
    } else {
      orderDelete.adminRejectNote = clicked;
    }
    orderDelete.status = "Diproses";
    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true);
        const result = await fetch(`api/admin/orders/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: orderDelete }),
        });
        const data = await result.json();
        if (data.status) {
          setClosed(true);
          resolve(data);
          getData();
          setIsLoading(false);
        } else {
          setClosed(true);
          reject();
          setIsLoading(false);
        }
      } catch (err) {
        setClosed(true);
        setIsLoading(false);
        reject();
        console.log(err);
      }
    });
    toast.promise(savingPromise, {
      loading: "Loading",
      success: "Success",
      error: "Error",
    });
  };

  return (
    <Modal onClose={() => setOrderDelete("")} closed={closed}>
      <h1 className="font-semibold text-lg dark:text-bright">
        Alasan Membatalkan Order
      </h1>
      <input type="radio" id="Pesanan Lama" name="reason" className="hidden" />
      <input
        type="radio"
        id="Ingin Mengganti Pesanan"
        name="reason"
        className="hidden"
      />
      <input type="radio" id="Lainnya" name="reason" className="hidden" />
      <div className="flex flex-col mt-2 gap-2 select-none">
        <label
          className={`bg-white rounded-lg px-2 py-1 border-2 cursor-pointer ${
            clicked == "Pesanan Sedang Dibuat"
              ? "border-primary"
              : "border-slate-300 dark:border-transparent"
          } dark:bg-dark2 dark:text-neutral-200`}
          htmlFor="Pesanan Lama"
          onClick={(e: any) => handleOptionChange(e)}
        >
          {"Pesanan Sedang Dibuat"}
        </label>
        <label
          className={`bg-white rounded-lg px-2 py-1 border-2 cursor-pointer ${
            clicked == "Pesanan Sudah Jadi"
              ? "border-primary"
              : "border-slate-300 dark:border-transparent"
          } dark:bg-dark2 dark:text-neutral-200`}
          htmlFor="Ingin Mengganti Pesanan"
          onClick={(e: any) => handleOptionChange(e)}
        >
          {"Pesanan Sudah Jadi"}
        </label>
        <label
          className={`bg-white rounded-lg px-2 py-1 border-2 cursor-pointer ${
            clicked == "Lainnya"
              ? "border-primary"
              : "border-slate-300 dark:border-transparent"
          } dark:bg-dark2 dark:text-neutral-200`}
          htmlFor="Lainnya"
          onClick={(e: any) => handleOptionChange(e)}
        >
          Lainnya
        </label>
      </div>
      <textarea
        className={`w-full opacity-0 mt-2 ${animate} rounded-xl focus:shadow-thin outline-none text-slate-600 mini-scrollbar transition-shadow duration-200 hide-scrollbar dark:bg-dark2 dark:placeholder:text-neutral-400 dark:text-neutral-200`}
        placeholder="Alasan"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
      />
      <div className="flex gap-3 mt-1">
        <button
          className="bg-red-500 text-red-100 px-2 py-[2px] rounded-lg disabled:bg-red-400 hover:bg-red-400"
          disabled={isLoading}
          onClick={() => handleConfirm()}
        >
          Batalkan
        </button>
        <button
          className="bg-green-500 text-green-50 px-2 py-[2px] rounded-lg hover:bg-green-400 disabled:bg-green-400"
          onClick={() => setClosed(true)}
        >
          Kembali
        </button>
      </div>
    </Modal>
  );
}
