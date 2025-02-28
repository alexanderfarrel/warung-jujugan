"use client";
import Refresh from "@/app/components/icons/refresh";
import FilterOrderHeading from "@/app/components/layouts/filter/filterOrderHeading";
import Loading from "@/app/components/ui/Loading";
import FormatDate from "@/services/formatter/formatDate";
import FormatTime from "@/services/formatter/formatTime";
import FormatToIDR from "@/services/formatter/formatToIDR";
import useWindowWidth from "@/services/windowWidth/services";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export default function OrdersAdmin() {
  const dataSaring = "Semua";
  const { data: session }: any = useSession();
  const windowWidth = useWindowWidth();
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/admin/orders", { next: { revalidate: 2 } });
      const result = await res.json();
      setData(result);
    };
    getData();
  }, []);

  return (
    <>
      {data.length > 0 &&
        data
          .filter((order: any) => {
            if (dataSaring == "Semua") {
              return (
                order.status != "Selesai" || order.status != "Tidak Selesai"
              );
            } else {
              return order.status == dataSaring;
            }
          })
          .map((order: any, index: number) => (
            <>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="shadow-thin rounded-xl px-4 py-2 mb-5"
                key={index}
              >
                {windowWidth <= 600 ? (
                  <>
                    <header className="flex gap-2 justify-between">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-semibold text-md self-start">
                          {order.name}
                        </h3>
                        <p className="font-normal self-start">{order.email}</p>
                        <p
                          className={`font-medium text-[13px] mt-1 px-1 rounded-md self-start ${
                            order.status == "Menunggu Konfirmasi"
                              ? "bg-orange-200 text-orange-600"
                              : order.status == "Diproses"
                              ? "bg-green-200 text-green-600"
                              : "bg-red-200 text-red-600"
                          } `}
                        >
                          {order.status}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[12px] text-neutral-500 font-medium bg-neutral-200 px-[6px] py-[1px] rounded-lg self-end">
                          {FormatTime(order.time)}
                        </p>
                        <p className="text-[12px] text-slate-500 font-medium bg-slate-200 px-[6px] py-[1px] rounded-lg self-end">
                          {FormatDate(order.time)}
                        </p>
                      </div>
                    </header>
                    <main
                      className={`flex justify-between my-2 ${
                        windowWidth <= 510 && "flex-col gap-4"
                      }`}
                    >
                      <div
                        className="flex flex-col gap-1"
                        style={{ flex: windowWidth <= 640 ? 4 : 3 }}
                      >
                        {order?.order?.makanan.length > 0 && (
                          <>
                            <FilterOrderHeading infoType="Makanan" />
                            {order.order.makanan.map((makanan: any) => (
                              <>
                                <section
                                  className={`flex justify-between items-center ${
                                    windowWidth <= 400 ? "pr-0" : "pr-5"
                                  }`}
                                >
                                  <main className="flex items-center gap-3 mr-4">
                                    <p>- {makanan.name}</p>
                                    <p className="font-medium whitespace-nowrap">
                                      x {makanan.count}
                                    </p>
                                  </main>
                                  <aside>
                                    <p>{FormatToIDR(makanan.totalPrice)}</p>
                                  </aside>
                                </section>
                              </>
                            ))}
                          </>
                        )}
                        {order?.order?.minuman.length > 0 && (
                          <>
                            <FilterOrderHeading infoType="Minuman" />
                            {order.order.minuman.map((minuman: any) => (
                              <>
                                <section
                                  className={`flex justify-between items-center ${
                                    windowWidth <= 400 ? "pr-0" : "pr-5"
                                  }`}
                                >
                                  <main className="flex items-center gap-3 mr-4">
                                    <p>- {minuman.name}</p>
                                    <p className="font-medium whitespace-nowrap">
                                      x {minuman.count}
                                    </p>
                                  </main>
                                  <aside>
                                    <p>{FormatToIDR(minuman.totalPrice)}</p>
                                  </aside>
                                </section>
                              </>
                            ))}
                          </>
                        )}
                      </div>
                      {windowWidth <= 510 ? (
                        ""
                      ) : (
                        <div className="bg-neutral-200 w-[2px] mr-4" />
                      )}

                      <div
                        className={`my-auto ${
                          windowWidth <= 510 &&
                          "self-end mr-1 border-b-2 border-green-500"
                        }`}
                        style={{ flex: 1 }}
                      >
                        <p className="text-sm">Total Belanja</p>{" "}
                        <h3 className="font-semibold">
                          {FormatToIDR(
                            order?.order?.makanan.totalPrice +
                              order?.order?.minuman.totalPrice
                          )}
                        </h3>
                      </div>
                    </main>
                    {order?.note.length > 0 && (
                      <div className="mb-3 flex flex-col">
                        <p className="font-medium">Catatan Pembeli : </p>
                        <span className="break-all text-sm">{order?.note}</span>
                      </div>
                    )}
                    {order.status == "Dibatalkan" && (
                      <div className="mb-3 flex flex-col">
                        <p className="font-medium text-red-600">
                          Catatan Pembatalan :{" "}
                        </p>
                        <span className="break-all text-sm text-red-500">
                          {order?.cancelNote}
                        </span>
                      </div>
                    )}
                    <footer className="flex justify-end gap-5">
                      <button
                        className={`px-2 rounded-lg ${
                          order.status == "Dibatalkan"
                            ? "bg-yellow-300 text-yellow-700"
                            : order.status == "Diproses"
                            ? "bg-orange-200 text-orange-600"
                            : "bg-green-300 text-green-700"
                        } text-[13px]`}
                        data-notAllowed="true"
                      >
                        {order.status == "Diproses"
                          ? "Selesaikan Pesanan"
                          : order.status == "Dibatalkan"
                          ? "Terima Pembatalan"
                          : "Terima Pesanan"}
                      </button>
                      <button
                        className="px-2 border-2 border-red-200 rounded-lg text-red-500 text-[13px]"
                        data-notAllowed="true"
                      >
                        Tolak Pesanan
                      </button>
                    </footer>
                  </>
                ) : (
                  <>
                    <header className="flex gap-2 justify-between items-center">
                      <h3 className="font-semibold text-md flex flex-col">
                        {/* {order.name} */}
                        {/* <span className="font-normal">{order.email}</span> */}
                      </h3>
                      <div className="flex gap-3 self-start">
                        <p className="text-[13px] text-neutral-500 font-medium bg-neutral-200 px-[6px] py-[1px] rounded-lg">
                          {FormatTime(order.time)}
                        </p>
                        <p className="text-[13px] text-slate-500 font-medium bg-slate-200 px-[6px] py-[1px] rounded-lg">
                          {FormatDate(order.time)}
                        </p>
                      </div>
                      <p
                        className={`font-medium text-[13px] mt-1 px-1 rounded-md self-start ${
                          order.status == "Menunggu Konfirmasi"
                            ? "bg-orange-200 text-orange-600"
                            : order.status == "Diproses"
                            ? "bg-green-200 text-green-600"
                            : "bg-red-200 text-red-600"
                        } `}
                      >
                        {order.status}
                      </p>
                    </header>
                    <main className="flex justify-between mb-3 mt-2">
                      {/* <div
                        className="flex flex-col gap-1 px-2"
                        style={{ flex: windowWidth <= 640 ? 4 : 3 }}
                      >
                        {order?.order?.makanan.length > 0 && (
                          <>
                            <FilterOrderHeading infoType="Makanan" />
                            {order.order.makanan.map((makanan: any) => (
                              <>
                                <section className="flex justify-between pr-5">
                                  <main className="flex gap-3">
                                    <div>
                                      <p>- {makanan.name}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">
                                        x {makanan.count}
                                      </p>
                                    </div>
                                  </main>
                                  <aside>
                                    <p>{FormatToIDR(makanan.totalPrice)}</p>
                                  </aside>
                                </section>
                              </>
                            ))}
                          </>
                        )}
                        {order?.order?.minuman.length > 0 && (
                          <>
                            <FilterOrderHeading infoType="Minuman" />
                            {order.order.minuman.map((minuman: any) => (
                              <>
                                <section className="flex justify-between pr-5">
                                  <main className="flex gap-3">
                                    <div>
                                      <p>- {minuman.name}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">
                                        x {minuman.count}
                                      </p>
                                    </div>
                                  </main>
                                  <aside>
                                    <p>{FormatToIDR(minuman.totalPrice)}</p>
                                  </aside>
                                </section>
                              </>
                            ))}
                          </>
                        )}
                      </div> */}
                      <div className="bg-neutral-200 w-[2px] mr-4" />
                      <div className="my-auto" style={{ flex: 1 }}>
                        <p className="text-sm">Total Belanja</p>{" "}
                        {/* <h3 className="font-semibold">
                          {FormatToIDR(
                            order?.order?.makanan.totalPrice +
                              order?.order?.minuman.totalPrice
                          )}
                        </h3> */}
                      </div>
                    </main>
                    <footer className="flex justify-between items-center gap-3">
                      <section>
                        {order?.note.length > 0 && (
                          <div className="flex-shrink">
                            <p className="font-medium">Catatan Pembeli : </p>
                            <span className="break-all">{order?.note}</span>
                          </div>
                        )}
                        {order?.status == "Dibatalkan" && (
                          <div className="flex-shrink mt-2">
                            <p className="font-medium text-red-600">
                              Catatan Pembatalan :{" "}
                            </p>
                            <span className="break-all text-red-500">
                              {order?.cancelNote}
                            </span>
                          </div>
                        )}
                      </section>

                      <div className="flex gap-2 flex-shrink-0 self-end">
                        <button
                          className={`px-2 py-1 rounded-lg ${
                            order.status == "Dibatalkan"
                              ? "bg-yellow-300 text-yellow-700"
                              : order.status == "Diproses"
                              ? "bg-orange-200 text-orange-600"
                              : "bg-green-300 text-green-700"
                          } text-sm`}
                          data-notAllowed="true"
                        >
                          {order.status == "Diproses"
                            ? "Selesaikan Pesanan"
                            : order.status == "Dibatalkan"
                            ? "Terima Pembatalan"
                            : "Terima Pesanan"}
                        </button>
                        <button
                          className="px-2 py-1 border-2 border-red-200 rounded-lg text-red-500 text-sm"
                          data-notAllowed="true"
                        >
                          Tolak Pesanan
                        </button>
                      </div>
                    </footer>
                  </>
                )}
              </motion.div>
            </>
          ))}
    </>
  );
}
