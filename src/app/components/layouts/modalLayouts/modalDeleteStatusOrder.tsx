import Image from "next/image";
import Modal from "../../ui/modal";
import FormatToIDR from "@/services/formatter/formatToIDR";
import { useState } from "react";

export default function ModalDeleteStatusOrder({
  setOrderDelete,
  orderDelete,
  setOrderDeleteReason,
}: {
  setOrderDelete: any;
  orderDelete: any;
  setOrderDeleteReason: any;
}) {
  const [closed, setClosed] = useState<boolean>(false);
  const handleConfirm = () => {
    setOrderDeleteReason(orderDelete);
    setClosed(true);
  };
  return (
    <Modal onClose={() => setOrderDelete("")} closed={closed}>
      <h1 className="font-semibold text-xl mb-2 dark:text-bright">Pesanan</h1>
      <div className="max-h-72 overflow-y-auto pr-4 khusus">
        {orderDelete?.order?.makanan.map((order: any, index: any) => (
          <>
            <div key={index} className="flex">
              <Image
                src="/images/sawi2.png"
                alt="sawi"
                width={100}
                height={100}
              />
              <div>
                <h3 className="font-medium dark:text-neutral-100">
                  {order.name}
                </h3>
                <p className="font-semibold dark:text-neutral-300">
                  {order.note == "nothing" ? (
                    <>
                      {FormatToIDR(order.price)}{" "}
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
        {orderDelete?.order?.minuman.map((order: any, index: any) => (
          <div key={index} className="flex">
            <Image
              src="/images/sawi2.png"
              alt="sawi"
              width={100}
              height={100}
            />
            <div>
              <h3 className="font-medium dark:text-neutral-100">
                {order.name}
              </h3>
              <p className="font-semibold dark:text-neutral-300">
                {order.note == "nothing" ? (
                  <>
                    {FormatToIDR(order.price)}{" "}
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
        ))}
      </div>
      <h3 className="mt-2 text-neutral-700 font-medium dark:text-neutral-200">
        Ingin Membatalkan Pesanan?
      </h3>
      <div className="flex gap-3 mt-1">
        <button
          className="text-red-600 px-2 py-[2px] rounded-lg hover:text-red-400"
          onClick={() => handleConfirm()}
        >
          Batalkan
        </button>
        <button
          className="bg-green-200 text-green-600 px-2 py-[2px] rounded-lg hover:bg-green-300"
          onClick={() => setClosed(true)}
        >
          Kembali
        </button>
      </div>
    </Modal>
  );
}
