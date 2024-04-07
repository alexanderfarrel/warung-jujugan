import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useWindowWidth from "@/services/windowWidth/services";
import FormatTime from "@/services/formatter/formatTime";
import FormatDate from "@/services/formatter/formatDate";
import FilterOrderHeading from "@/app/components/layouts/filter/filterOrderHeading";
import FormatToIDR from "@/services/formatter/formatToIDR";

export default function HistoryViewAdmin(props: any) {
  const { session, getData } = props;
  const windowWidth = useWindowWidth();

  const [data, setData] = useState<any>([]);

  const orders = data?.filter((order: any) => order.proses == "Selesai");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getData]);
  return (
    <>
      {orders?.length > 0 ? (
        orders
          .filter((order: any) => {
            return order.proses == "Selesai";
          })
          .map((order: any) => (
            <>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="shadow-thin rounded-xl px-4 py-2 mb-5 dark:bg-dark2"
                key={order.time}
              >
                {windowWidth <= 600 ? (
                  <>
                    <header className="flex gap-2 justify-between">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-semibold text-md self-start dark:text-bright text-sm">
                          {order.name}
                        </h3>
                        <p className="font-normal self-start dark:text-neutral-200 text-sm">
                          {order.email}
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
                          {order.status}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[12px] text-neutral-500 font-medium bg-neutral-200 px-[6px] py-[1px] rounded-lg self-end dark:bg-neutral-600 dark:text-neutral-200">
                          {FormatTime(order.time)}
                        </p>
                        <p className="text-[12px] text-slate-500 font-medium bg-slate-200 px-[6px] py-[1px] rounded-lg self-end dark:bg-slate-500/60 dark:text-slate-200">
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
                            <FilterOrderHeading infoType="Makanan" small />
                            {order.order.makanan.map((makanan: any) => (
                              <>
                                <section
                                  className={`flex justify-between items-center ${
                                    windowWidth <= 400 ? "pr-0" : "pr-5"
                                  }`}
                                >
                                  <main className="flex items-center gap-3 mr-4 dark:text-neutral-200 text-[15px]">
                                    <p>- {makanan.name}</p>
                                    <p className="font-medium whitespace-nowrap">
                                      x {makanan.count}
                                    </p>
                                  </main>
                                  <aside className="dark:text-neutral-200 text-sm">
                                    <p>{FormatToIDR(makanan.totalPrice)}</p>
                                  </aside>
                                </section>
                              </>
                            ))}
                          </>
                        )}
                        {order?.order?.minuman.length > 0 && (
                          <>
                            <FilterOrderHeading infoType="Minuman" small />
                            {order.order.minuman.map((minuman: any) => (
                              <>
                                <section
                                  className={`flex justify-between items-center ${
                                    windowWidth <= 400 ? "pr-0" : "pr-5"
                                  }`}
                                >
                                  <main className="flex items-center gap-3 mr-4 dark:text-neutral-200 text-[15px]">
                                    <p>- {minuman.name}</p>
                                    <p className="font-medium whitespace-nowrap">
                                      x {minuman.count}
                                    </p>
                                  </main>
                                  <aside className="dark:text-neutral-200 text-sm">
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
                        <div className="bg-neutral-200 w-[2px] ml-1 mr-4" />
                      )}

                      <div
                        className={`my-auto ${
                          windowWidth <= 510 &&
                          "self-end mr-1 border-b-2 border-green-500"
                        }`}
                        style={{ flex: 1 }}
                      >
                        <p className="text-sm dark:text-neutral-300">
                          Total Belanja
                        </p>{" "}
                        <h3 className="font-semibold text-base dark:text-neutral-200">
                          {FormatToIDR(
                            order?.order?.makanan.totalPrice +
                              order?.order?.minuman.totalPrice
                          )}
                        </h3>
                      </div>
                    </main>
                    <div className="flex flex-col gap-1 mb-3">
                      {order?.note.length > 0 && (
                        <div className="flex flex-col text-sm">
                          <p className="font-medium text-green-500">
                            Catatan Pembeli :{" "}
                          </p>
                          <span className="break-all text-sm dark:text-neutral-100">
                            {order?.note}
                          </span>
                        </div>
                      )}
                      {order?.cancelNote != undefined && (
                        <div className="flex flex-col text-sm">
                          <p className="font-medium text-red-600">
                            Catatan Pembatalan :{" "}
                          </p>
                          <span className="break-all text-sm text-neutral-100">
                            {order?.cancelNote}
                          </span>
                        </div>
                      )}
                      {order?.adminRejectNote != undefined && (
                        <section className="flex-shrink text-sm">
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
                    </div>
                  </>
                ) : (
                  <>
                    <header className="flex gap-2 justify-between items-center">
                      <h3 className="font-semibold text-md flex flex-col dark:text-bright">
                        {order.name}
                        <span className="font-normal dark:text-neutral-200">
                          {order.email}
                        </span>
                      </h3>
                      <div className="flex gap-3 self-start">
                        <p className="text-[13px] text-neutral-500 font-medium bg-neutral-200 px-[6px] py-[1px] rounded-lg dark:bg-neutral-600 dark:text-neutral-200">
                          {FormatTime(order.time)}
                        </p>
                        <p className="text-[13px] text-slate-500 font-medium bg-slate-200 px-[6px] py-[1px] rounded-lg dark:bg-slate-500/60 dark:text-slate-200">
                          {FormatDate(order.time)}
                        </p>
                      </div>
                      <p
                        className={`font-medium text-[13px] mt-1 px-1 rounded-md self-start ${
                          order.status == "Dibatalkan"
                            ? "bg-orange-200 text-orange-600"
                            : order.status == "Selesai"
                            ? "bg-green-200 text-green-600"
                            : "bg-red-200 text-red-600"
                        } `}
                      >
                        {order.status}
                      </p>
                    </header>
                    <main className="flex justify-between mb-3 mt-2">
                      <div
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
                                      <p className="dark:text-neutral-200">
                                        - {makanan.name}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="font-medium dark:text-neutral-200">
                                        x {makanan.count}
                                      </p>
                                    </div>
                                  </main>
                                  <aside>
                                    <p className="dark:text-neutral-200">
                                      {FormatToIDR(makanan.totalPrice)}
                                    </p>
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
                                      <p className="dark:text-neutral-200">
                                        - {minuman.name}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="font-medium dark:text-neutral-200">
                                        x {minuman.count}
                                      </p>
                                    </div>
                                  </main>
                                  <aside>
                                    <p className="dark:text-neutral-200">
                                      {FormatToIDR(minuman.totalPrice)}
                                    </p>
                                  </aside>
                                </section>
                              </>
                            ))}
                          </>
                        )}
                      </div>
                      <div className="bg-neutral-200 w-[2px] mr-4" />
                      <div className="my-auto" style={{ flex: 1 }}>
                        <p className="text-sm dark:text-neutral-300">
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
                    <footer className="flex justify-between items-center gap-3">
                      <section>
                        {order?.note.length > 0 && (
                          <div className="flex-shrink">
                            <p className="font-medium text-green-500">
                              Catatan Pembeli :{" "}
                            </p>
                            <span className="break-all dark:text-neutral-100">
                              {order?.note}
                            </span>
                          </div>
                        )}
                        {order?.cancelNote != undefined && (
                          <div className="flex-shrink">
                            <p className="font-medium text-red-500">
                              Catatan Pembatalan :{" "}
                            </p>
                            <span className="break-all dark:text-neutral-100">
                              {order?.cancelNote}
                            </span>
                          </div>
                        )}
                        {order?.adminRejectNote != undefined && (
                          <div className="flex-shrink">
                            <p className="font-medium text-orange-500">
                              Catatan Penjual :{" "}
                            </p>
                            <span className="break-all dark:text-neutral-100">
                              {order?.adminRejectNote}
                            </span>
                          </div>
                        )}
                      </section>
                    </footer>
                  </>
                )}
              </motion.div>
            </>
          ))
      ) : (
        <div className="text-center text-primary font-medium text-xl">
          History Kosong
        </div>
      )}
    </>
  );
}
