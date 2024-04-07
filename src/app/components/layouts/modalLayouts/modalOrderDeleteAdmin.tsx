import { useState } from "react";
import Modal from "../../ui/modal";

export default function ModalOrderDelete({
  order,
  setOrder,
  setOrderReason,
  customTitle,
}: {
  order: any;
  setOrder: any;
  setOrderReason: any;
  customTitle: string;
}) {
  const [closed, setClosed] = useState<boolean>(false);
  const handleDelete = () => {
    setOrderReason(order);
    setClosed(true);
  };
  return (
    <Modal onClose={() => setOrder("")} closed={closed}>
      <div className="max-w-[16rem]">
        <h1 className="font-semibold text-xl dark:text-bright">
          {customTitle}
        </h1>
        <div className="border-t-2 border-red-300 py-1 my-1">
          <p className="break-all mb-1 dark:text-neutral-200">
            User : <span className="font-medium">{order.name}</span>
          </p>
          {order.order.makanan &&
            order.order.makanan.map((item: any, index: number) => (
              <>
                <div className={`flex justify-between dark:text-neutral-200`}>
                  <p>- {item.name}</p>
                  <p>x {item.count}</p>
                </div>
              </>
            ))}
          {order.order.minuman &&
            order.order.minuman.map((item: any, index: number) => (
              <>
                <div className={`flex justify-between dark:text-neutral-200`}>
                  <p>- {item.name}</p>
                  <p>x {item.count}</p>
                </div>
              </>
            ))}
        </div>
        <p className="font-medium dark:text-neutral-100">{`Ingin ${
          customTitle == "Tolak Pesanan"
            ? "Menolak Pesanan"
            : "Menolak Pembatalan"
        } Ini?`}</p>
        <div className="flex gap-3 mt-2">
          <button
            className="bg-red-500 text-red-100 px-2 py-[2px] rounded-lg disabled:bg-red-400 hover:bg-red-400"
            onClick={() => handleDelete()}
          >
            Tolak
          </button>
          <button
            className="bg-green-500 text-green-50 px-2 py-[2px] rounded-lg hover:bg-green-400 disabled:bg-green-400"
            onClick={() => setClosed(true)}
          >
            Batal
          </button>
        </div>
      </div>
    </Modal>
  );
}
