"use client";

import useWindowWidth from "@/services/windowWidth/services";
import React, { useCallback, useEffect, useState } from "react";
import ModalOrderStatus from "../../layouts/modalLayouts/modalOrderStatus";
import { motion } from "framer-motion";
import Spinner from "../../ui/Spinner";
import History from "../../icons/history";
import Refresh from "../../icons/refresh";
import Loading from "../../ui/Loading";
import FormatTime from "@/services/formatter/formatTime";
import FormatDate from "@/services/formatter/formatDate";
import formatOrders from "@/services/formatter/formatOrders";
import FormatToIDR from "@/services/formatter/formatToIDR";
import ModalDeleteStatusOrder from "../../layouts/modalLayouts/modalDeleteStatusOrder";
import ModalReasonDeleteOrder from "../../layouts/modalLayouts/modalReasonDeleteOrder";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import toast from "react-hot-toast";
import { notifStatus } from "@/app/redux/notificationSlice";

export default function StatusView({ session }: any) {
  const windowWidth = useWindowWidth();
  const [data, setData] = useState<any>([]);
  const [modalOrder, setModalOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDelete, setOrderDelete] = useState<any>(null);
  const [orderDeleteReason, setOrderDeleteReason] = useState<any>(null);
  const redux = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const getData = useCallback(async () => {
    const res = await fetch(
      `/api/users/getordersconfirm?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await res.json();
    setData(data.orders || []);
  }, [session?.accessToken, session?.user?.id]);

  const separatedOrders = formatOrders(data);
  const sortedResult = separatedOrders.sort(
    (a: any, b: any) => a.time - b.time
  );
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await getData();
      dispatch(notifStatus());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);
  const handleClick = (e: any, order: any) => {
    if (e.target.dataset.notallowed) {
      return;
    }
    setModalOrder(order);
  };
  return (
    <>
      <section className="mt-[4.5rem]">
        <div
          className={`flex justify-between items-center mb-3 ${
            windowWidth <= 450 ? "flex-col gap-1" : ""
          }`}
        >
          <h1 className="text-xl font-bold dark:text-bright">Status Pesanan</h1>
          <div className={`flex gap-2`}>
            <button
              className="group flex items-center gap-1 border-2 border-neutral-300 text-neutral-700 px-2 py-1 rounded-full sm1:py-0 sm1:text-sm sm0:py-0 sm0:text-[13px] dark:text-bright"
              onClick={() => handleRefresh()}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading small={windowWidth <= 640} />
              ) : (
                <>
                  {
                    <Refresh className="group-hover:rotate-180 w-5 transition-all duration-200 sm1:w-4 sm0:w-4" />
                  }{" "}
                  Refresh
                </>
              )}
            </button>
            <Link
              className="flex items-center gap-1 bg-neutral-200 text-neutral-700 px-2 py-1 rounded-full sm1:py-0 sm1:text-sm sm0:py-0 sm0:text-[13px] hover:bg-neutral-100"
              href={"/history"}
            >
              <History className="w-5 sm1:w-4 sm0:w-4" /> History
            </Link>
          </div>
        </div>
        {redux?.notifications.statusCount > 0 ? (
          sortedResult.length == 0 ? (
            <div className="flex shadow-thin rounded-xl justify-center items-center gap-3 h-12 dark:bg-dark2">
              <p className="text-neutral-500 dark:text-bright">Loading... </p>
              <aside>
                {" "}
                <Spinner widthHeight="w-6 h-6" primary={true} />
              </aside>
            </div>
          ) : (
            <React.Fragment>
              {sortedResult
                .filter((item: any) => item.proses != "Selesai")
                .map((order: any, index: number) => (
                  <React.Fragment key={order.id}>
                    <motion.div
                      key={order.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="shadow-thin rounded-xl px-4 py-2 mb-5 dark:bg-dark2"
                      onClick={(e) => handleClick(e, order)}
                    >
                      {windowWidth < 640 ? (
                        <>
                          <header className="flex flex-col gap-1">
                            <div className="flex w-full items-center justify-between">
                              <h3 className="font-semibold dark:text-bright">
                                Pesanan {index + 1}
                              </h3>
                              <p
                                className={`font-medium text-[12px] mt-1 px-1 rounded-md self-start ${
                                  order.status == "Menunggu Konfirmasi"
                                    ? "bg-orange-200 text-orange-600"
                                    : order.status == "Diproses"
                                    ? "bg-green-200 text-green-600"
                                    : "bg-red-200 text-red-600"
                                } `}
                              >
                                {order.status != "Dibatalkan"
                                  ? order.status
                                  : "Menunggu Dibatalkan"}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <p className="text-[11px] text-neutral-500 font-medium bg-neutral-200 px-[6px] py-[1px] rounded-lg dark:bg-neutral-600 dark:text-neutral-200">
                                {FormatTime(order.time)}
                              </p>
                              <p className="text-[11px] text-slate-500 font-medium bg-slate-200 px-[6px] py-[1px] rounded-lg dark:bg-slate-500/60 dark:text-slate-200">
                                {FormatDate(order.time)}
                              </p>
                            </div>
                          </header>
                          <main className="flex justify-between mt-2">
                            <div
                              className="flex flex-col gap-1"
                              style={{ flex: windowWidth <= 500 ? 2 : 3 }}
                            >
                              {order?.order?.makanan.length > 0 && (
                                <>
                                  <div className="flex gap-3 text-sm">
                                    <p className="dark:text-neutral-300">
                                      {order?.order?.makanan.totalCount} Makanan
                                    </p>
                                    <h3 className="dark:text-neutral-300">
                                      {FormatToIDR(
                                        order?.order?.makanan.totalPrice
                                      )}
                                    </h3>
                                  </div>
                                </>
                              )}
                              {order?.order?.minuman.length > 0 && (
                                <>
                                  <div className="flex gap-3 text-sm">
                                    <p className="dark:text-neutral-300">
                                      {order?.order?.minuman.totalCount} Minuman
                                    </p>
                                    <h3 className="dark:text-neutral-300">
                                      {FormatToIDR(
                                        order?.order?.minuman.totalPrice
                                      )}
                                    </h3>
                                  </div>
                                </>
                              )}
                            </div>
                            <div
                              className={`bg-neutral-200 w-[2px] ${
                                windowWidth <= 315 ? "mr-1" : "mr-4"
                              }`}
                            />
                            <div className="my-auto" style={{ flex: 1 }}>
                              <p className="text-[12px] dark:text-bright">
                                Total Belanja
                              </p>{" "}
                              <h3 className="font-semibold text-[15px] dark:text-neutral-200">
                                {FormatToIDR(
                                  order?.order?.makanan.totalPrice +
                                    order?.order?.minuman.totalPrice
                                )}
                              </h3>
                            </div>
                          </main>
                          <p className="text-[12px] text-center text-neutral-400 cursor-pointer my-2">
                            {"<< Click To View Order >>"}
                          </p>
                          <footer
                            className={`flex ${
                              order?.adminRejectNote != undefined
                                ? "flex-col"
                                : "justify-end"
                            } gap-3`}
                          >
                            {order.status == "Diproses" &&
                              order.adminRejectNote != undefined && (
                                <section className="flex-shrink">
                                  <h3 className="font-semibold text-orange-500 text-sm">
                                    Pembatalan Ditolak
                                  </h3>
                                  <div className="flex gap-2 dark:text-bright text-[13px]">
                                    <p className="font-medium flex-shrink-0">
                                      Catatan Penjual :
                                    </p>{" "}
                                    <span className="break-all">
                                      {order.adminRejectNote}
                                    </span>
                                  </div>
                                </section>
                              )}
                            <div className="flex self-end gap-2">
                              {order.status != "Diproses" &&
                                order.status != "Dibatalkan" && (
                                  <button
                                    className="px-2 rounded-md text-red-500 text-[13px] font-medium"
                                    data-notallowed="true"
                                    onClick={() => setOrderDelete(order)}
                                  >
                                    Batalkan Pesanan
                                  </button>
                                )}
                              <button
                                className="px-2 border-2 border-green-300 bg-green-300 rounded-md text-green-700 text-[13px] font-medium"
                                onClick={() =>
                                  toast.error("Fitur belum Tersedia", {
                                    icon: "😭",
                                  })
                                }
                                data-notallowed="true"
                              >
                                Hubungi Penjual
                              </button>
                            </div>
                          </footer>
                        </>
                      ) : (
                        <>
                          <header className="flex gap-2 justify-between items-center">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold dark:text-bright">
                                Pesanan {index + 1}
                              </h3>
                              <p className="text-[13px] text-neutral-500 font-medium bg-neutral-200 px-[6px] py-[1px] rounded-lg dark:bg-neutral-600 dark:text-neutral-200">
                                {FormatTime(order.time)}
                              </p>
                              <p className="text-[13px] text-slate-500 font-medium bg-slate-200 px-[6px] py-[1px] rounded-lg dark:bg-slate-500/60 dark:text-slate-200">
                                {FormatDate(order.time)}
                              </p>
                            </div>
                            <p className="text-sm text-neutral-400 cursor-pointer">
                              {"<< Click To View Order >>"}
                            </p>
                            <p
                              className={`font-medium text-[13px] mt-1 px-1 rounded-md self-start ${
                                order.status == "Menunggu Konfirmasi"
                                  ? "bg-orange-200 text-orange-600"
                                  : order.status == "Diproses"
                                  ? "bg-green-200 text-green-600"
                                  : "bg-red-200 text-red-600"
                              } `}
                            >
                              {order.status != "Dibatalkan"
                                ? order.status != "Ditolak"
                                  ? order.status
                                  : "Dibatalkan Penjual"
                                : "Menunggu Dibatalkan"}
                            </p>
                          </header>
                          <main className="flex justify-between my-3">
                            <div
                              className="flex flex-col gap-1"
                              style={{ flex: windowWidth <= 640 ? 4 : 3 }}
                            >
                              {order?.order?.makanan.length > 0 && (
                                <>
                                  <div className="flex gap-3">
                                    <p className="dark:text-neutral-300">
                                      {order?.order?.makanan.totalCount} Makanan
                                    </p>
                                    <h3 className="dark:text-neutral-300">
                                      {FormatToIDR(
                                        order?.order?.makanan.totalPrice
                                      )}
                                    </h3>
                                  </div>
                                </>
                              )}
                              {order?.order?.minuman.length > 0 && (
                                <>
                                  <div className="flex gap-3">
                                    <p className="dark:text-neutral-300">
                                      {order?.order?.minuman.totalCount} Minuman
                                    </p>
                                    <h3 className="dark:text-neutral-300">
                                      {FormatToIDR(
                                        order?.order?.minuman.totalPrice
                                      )}
                                    </h3>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="bg-neutral-200 w-[2px] mr-4" />
                            <div className="my-auto" style={{ flex: 1 }}>
                              <p className="text-sm dark:text-bright">
                                Total Belanja
                              </p>{" "}
                              <h3 className="font-semibold dark:text-neutral-200">
                                {FormatToIDR(
                                  order?.order?.makanan.totalPrice +
                                    order?.order?.minuman.totalPrice
                                )}
                              </h3>
                            </div>
                          </main>
                          <footer
                            className={`flex ${
                              order?.adminRejectNote != undefined
                                ? "justify-between"
                                : "justify-end"
                            } gap-5`}
                          >
                            {order.status == "Diproses" &&
                              order.adminRejectNote != undefined && (
                                <section className="flex-shrink">
                                  <h3 className="font-semibold text-orange-500">
                                    Pembatalan Ditolak
                                  </h3>
                                  <div className="flex gap-2 dark:text-bright">
                                    <p className="font-medium flex-shrink-0">
                                      Catatan Penjual :
                                    </p>{" "}
                                    <span className="break-all">
                                      {order.adminRejectNote}
                                    </span>
                                  </div>
                                </section>
                              )}
                            {order.status !== "Dibatalkan" &&
                              order.status !== "Diproses" && (
                                <button
                                  className="px-2 py-1 text-red-500 text-sm font-medium"
                                  data-notallowed="true"
                                  onClick={() => setOrderDelete(order)}
                                >
                                  Batalkan Pesanan
                                </button>
                              )}

                            <button
                              className="px-2 py-1 bg-green-200 rounded-lg text-green-600 text-sm flex-shrink-0 self-end font-medium"
                              data-notallowed="true"
                              onClick={() =>
                                toast.error("Fitur belum Tersedia", {
                                  icon: "😭",
                                })
                              }
                            >
                              Hubungi Penjual
                            </button>
                          </footer>
                        </>
                      )}
                    </motion.div>
                  </React.Fragment>
                ))}
            </React.Fragment>
          )
        ) : (
          <div className="shadow-thin rounded-xl px-4 py-2 text-center dark:text-bright dark:bg-dark2">
            <h1>Tidak Ada Order</h1>
          </div>
        )}
      </section>
      {modalOrder && (
        <ModalOrderStatus
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
        />
      )}
      {orderDelete && (
        <ModalDeleteStatusOrder
          orderDelete={orderDelete}
          setOrderDelete={setOrderDelete}
          setOrderDeleteReason={setOrderDeleteReason}
        />
      )}
      {orderDeleteReason && (
        <ModalReasonDeleteOrder
          orderDelete={orderDeleteReason}
          setOrderDelete={setOrderDeleteReason}
          token={session.accessToken}
          getData={getData}
        />
      )}
    </>
  );
}
