import Image from "next/image";
import Modal from "../../ui/modal";
import Button from "../../ui/Button";
import FormatToIDR from "@/services/formatter/formatToIDR";
import { useState } from "react";

export default function ModalOrderStatus(props: any) {
  const { modalOrder, setModalOrder } = props;
  const [closed, setClosed] = useState<boolean>(false);
  return (
    <Modal onClose={() => setModalOrder(null)} closed={closed}>
      <h1 className="font-semibold text-xl mb-2 dark:text-bright">Pesanan</h1>
      <div className="max-h-72 overflow-y-auto pr-4 mini-scrollbar">
        {modalOrder?.order?.makanan.map((order: any, index: any) => (
          <>
            <div key={index} className="flex gap-3 mb-2">
              <div className="w-20 h-20 flex justify-center items-center overflow-hidden">
                {order.note != "nothing" ? (
                  <Image
                    src={order.topingChecked[0].display}
                    alt={order.name}
                    width={80}
                    height={80}
                    className="object-center object-cover"
                  />
                ) : (
                  <Image
                    src={
                      order.topingChecked[0].thumbnail ||
                      order.topingChecked[0].display
                    }
                    alt={order.name}
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
        {modalOrder?.order?.minuman.map((order: any, index: any) => (
          <div key={index} className="flex gap-2 mb-2">
            <div className="w-20 h-20 flex justify-center items-center overflow-hidden">
              {order.note != "nothing" ? (
                <Image
                  src={order.topingChecked[0].display}
                  alt={order.name}
                  width={80}
                  height={80}
                  className="object-center object-cover"
                />
              ) : (
                <Image
                  src={
                    order.topingChecked[0].thumbnail ||
                    order.topingChecked[0].display
                  }
                  alt={order.name}
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
      {modalOrder?.note?.length > 0 && (
        <div className="max-w-[18rem] mt-2">
          <h3 className="font-medium text-neutral-700 ml-1 dark:text-neutral-200">
            Catatan :
          </h3>{" "}
          <p className="bg-white p-2 rounded-xl text-neutral-600 dark:bg-dark2 dark:text-neutral-300">
            {modalOrder?.note}
          </p>
        </div>
      )}
      {modalOrder?.cancelNote?.length > 0 && (
        <div className="max-w-[18rem] mt-2">
          <h3 className="font-medium text-red-600 ml-1">
            Catatan Batal Pesanan :
          </h3>{" "}
          <p className="p-2 rounded-xl bg-red-100 text-red-500">
            {modalOrder?.cancelNote}
          </p>
        </div>
      )}
      <div className="flex justify-between px-2 mt-2 items-center gap-2">
        <h2 className="text-neutral-500 text-[15px] dark:text-neutral-300">{`Total Harga (${
          modalOrder.order.makanan.totalCount +
          modalOrder.order.minuman.totalCount
        } Pesanan)`}</h2>
        <p className="font-semibold dark:text-bright">
          {FormatToIDR(
            modalOrder?.order?.makanan?.totalPrice +
              modalOrder?.order?.minuman?.totalPrice
          )}
        </p>
      </div>
      <Button
        onClick={() => setClosed(true)}
        className="w-full bg-secondary hover:bg-secondary/80 text-white rounded-xl mt-2"
      >
        Okey
      </Button>
    </Modal>
  );
}
