import { useCallback, useEffect, useOptimistic, useState } from "react";
import toast from "react-hot-toast";
import ModalOrderConfirm from "../../layouts/modalLayouts/modalOrderConfirm";
import useWindowWidth from "@/services/windowWidth/services";
import FilterOrder from "../../layouts/filter/filterOrder";
import FilterOrderHeading from "../../layouts/filter/filterOrderHeading";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import FormatToIDR from "@/services/formatter/formatToIDR";
import dynamic from "next/dynamic";
import { notifOrder } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";

function OrdersView(props: any) {
  const { session, orders, setOrders, countTemporary, setCountTemporary } =
    props;
  const [updateProduct, setUpdateProduct] = useState<any>([]);
  const [sum, setSum] = useState(0);
  const [statisOrder, setStatisOrder] = useState(orders);
  useEffect(() => {
    setStatisOrder(orders);
  }, [orders, setStatisOrder]);
  const [loading, setLoading] = useState<any>([
    { isLoading: false },
    { loadingInfo: [] },
    { allLoading: false },
  ]);
  const isLoading = loading.find((loading: any) =>
    loading.hasOwnProperty("isLoading")
  );
  const loadingInfo = loading.find((loading: any) =>
    loading.hasOwnProperty("loadingInfo")
  );
  const allLoading = loading.find((loading: any) =>
    loading.hasOwnProperty("allLoading")
  );
  const [orderConfirm, setOrderConfirm] = useState("");
  const [sumBarang, setSumBarang] = useState(0);

  const redux = useSelector((state: any) => state);
  const dispatch = useDispatch();
  let windowWidth = useWindowWidth();

  const getData = useCallback(async () => {
    const res = await fetch(`/api/users/getorders?id=${session?.user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await res.json();
    setOrders(data?.data?.orders || []);
  }, [session?.accessToken, session?.user?.id, setOrders]);

  const getSumBarang = useCallback(() => {
    return orders.reduce((total: any, order: any) => total + order.count, 0);
  }, [orders]);

  const getSum = useCallback(() => {
    let nothing = statisOrder.filter((item: any) => item.note == "nothing");
    let choiceOne = statisOrder.filter((item: any) => item.note == "choiceOne");

    let hargaNothing = nothing.reduce((total: any, item: any) => {
      let toppingPrices = item.topingChecked.map((toping: any) => toping.price);
      let itemTotalPrice =
        toppingPrices.reduce((acc: number, price: number) => acc + price, 0) +
        item.price;
      return total + itemTotalPrice * item.count;
    }, 0);

    let hargaChoiceOne = choiceOne?.reduce((total: any, item: any) => {
      return total + item.topingChecked[0].price * item.count;
    }, 0);
    setSum(hargaNothing + hargaChoiceOne);
  }, [statisOrder, updateProduct]);
  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getSum();
    setSumBarang(getSumBarang());
  }, [getSum, getSumBarang]);

  const handleResult = useCallback(
    async (product: any, update?: boolean) => {
      const savingPromise = new Promise(async (resolve, reject) => {
        setLoading(() => {
          return [
            { isLoading: true },
            { loadingInfo: [...loadingInfo.loadingInfo, product.id] },
            { allLoading: false },
          ];
        });
        try {
          const result: any = await fetch("/api/profile/order", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify({
              product,
              email: session?.user?.email,
              update,
            }),
          });
          const res = await result.json();
          if (res.status) {
            setLoading((prev: any) => {
              const newState = [...prev];
              if (
                newState.some(
                  (item: any) =>
                    item.loadingInfo && Array.isArray(item.loadingInfo)
                )
              ) {
                newState.forEach((item: any) => {
                  if (
                    item.loadingInfo &&
                    Array.isArray(item.loadingInfo) &&
                    item.loadingInfo.includes(product.id)
                  ) {
                    item.loadingInfo = item.loadingInfo.filter(
                      (id: any) => id !== product.id
                    );
                  }
                  if (item.isLoading) {
                    item.isLoading = false;
                  }
                });
              }
              return newState;
            });
            dispatch(notifOrder());
            setUpdateProduct({});
            resolve("Berhasil");
          } else {
            toast.error("Refresh Halaman ini / keluar dan kembali lagi");
            reject("Gagal");
          }
        } catch (err) {
          reject("Gagal");
          console.log(err);
        }
      });
      toast.promise(savingPromise, {
        loading: "Loading",
        success: "Berhasil",
        error: "Gagal",
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (updateProduct && updateProduct.length > 0) {
        for (let i = 0; i < updateProduct.length; i++) {
          setTimeout(() => {
            handleResult(updateProduct[i], true);
          }, i * 200);
        }
      }
    }, 200);
    return () => clearTimeout(delaySearch);
  }, [updateProduct, handleResult]);

  const debounceHandleIncrease = (product: any) => {
    setLoading(() => {
      return [
        { isLoading: true },
        { loadingInfo: { [product.id]: true } },
        { allLoading: false },
      ];
    });

    setCountTemporary({
      ...countTemporary,
      [product.id]: (countTemporary[product.id] || product.count) + 1,
    });
    product.count = (countTemporary[product.id] || product.count) + 1;

    setUpdateProduct((prev: any) => {
      if (!Array.isArray(prev)) {
        prev = [];
      }

      const updatedProducts = prev.map((item: any) => {
        if (item.id === product.id) {
          item.count = (countTemporary[product.id] || item.count) + 1;
        }
        return item;
      });

      const foundIndex = prev.findIndex((item: any) => item.id === product.id);
      if (foundIndex === -1) {
        updatedProducts.push(product);
      }

      return updatedProducts;
    });
  };

  const debounceHandleDecrease = (product: any) => {
    setLoading(() => {
      return [
        { isLoading: true },
        { loadingInfo: { [product.id]: true } },
        { allLoading: false },
      ];
    });
    if (product.count == 1) {
      return toast.error("Jumlah harus lebih dari 1");
    }
    if (countTemporary[product.id] == 1) {
      return toast.error("Jumlah harus lebih dari 1");
    }
    setCountTemporary({
      ...countTemporary,
      [product.id]: (countTemporary[product.id] || product.count) - 1,
    });
    product.count = (countTemporary[product.id] || product.count) - 1;
    setUpdateProduct((prev: any) => {
      if (!Array.isArray(prev)) {
        prev = [];
      }

      const updatedProducts = prev.map((item: any) => {
        if (item.id === product.id) {
          item.count = (countTemporary[product.id] || item.count) - 1;
        }
        return item;
      });

      const foundIndex = prev.findIndex((item: any) => item.id === product.id);
      if (foundIndex === -1) {
        updatedProducts.push(product);
      }

      return updatedProducts;
    });
  };

  const groupedOrders = statisOrder.reduce((grouped: any, order: any) => {
    const orderType = order.type || "default";
    grouped[orderType] = grouped[orderType] || [];
    grouped[orderType].push(order);
    return grouped;
  }, {});

  const handleDelete = async (product: any) => {
    const savingPromise = new Promise(async (resolve, reject) => {
      setLoading(() => {
        return [{ isLoading: true }, { loadingInfo: {} }, { allLoading: true }];
      });
      try {
        const result: any = await fetch("/api/profile/order", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            email: session?.user?.email,
            product,
          }),
        });
        const res = await result.json();
        if (res.status) {
          setLoading(() => {
            return [
              { isLoading: false },
              { loadingInfo: [] },
              { allLoading: false },
            ];
          });
          dispatch(notifOrder());
          getData();
          resolve("Berhasil");
        } else {
          toast.error("Gagal");
          reject("Gagal");
        }
      } catch (err) {
        reject("Gagal");
        console.log(err);
      }
    });
    toast.promise(savingPromise, {
      loading: "Menghapus...",
      success: "Berhasil",
      error: "Gagal",
    });
  };

  const handlePesanan = (orders: any) => {
    if (orders.length == 0) {
      return toast.error("Tidak ada pesanan");
    } else {
      setOrderConfirm(orders);
    }
  };

  return (
    <>
      <section className="mt-20 max-w-4xl flex gap-4">
        <main className="grow rounded-3xl flex flex-col gap-4">
          <div className="rounded-xl shadow-custom px-4 py-2 flex flex-col gap-2 dark:bg-dark2">
            {redux?.notifications?.orderCount > 0 ? (
              orders?.length == 0 ? (
                <>
                  <div className="flex justify-center items-center gap-3 h-12">
                    <p className="text-neutral-500 dark:text-bright">
                      Loading...{" "}
                    </p>
                    <aside>
                      {" "}
                      <Spinner widthHeight="w-6 h-6" primary={true} />
                    </aside>
                  </div>
                </>
              ) : (
                <>
                  {groupedOrders.makanan && (
                    <>
                      <FilterOrderHeading infoType="Makanan" />
                      {groupedOrders.makanan.map(
                        (order: any, index: number) => (
                          <>
                            <FilterOrder
                              key={order.id}
                              order={order}
                              index={index}
                              groupedOrders={groupedOrders}
                              isLoading={isLoading}
                              loadingInfo={loadingInfo}
                              allLoading={allLoading}
                              handleDelete={handleDelete}
                              debounceHandleIncrease={debounceHandleIncrease}
                              debounceHandleDecrease={debounceHandleDecrease}
                              countTemporary={countTemporary}
                              infoType="makanan"
                            />
                          </>
                        )
                      )}
                    </>
                  )}
                  {groupedOrders.minuman && (
                    <>
                      <FilterOrderHeading infoType="Minuman" />
                      {groupedOrders.minuman.map(
                        (order: any, index: number) => (
                          <>
                            <FilterOrder
                              key={order.id}
                              order={order}
                              index={index}
                              groupedOrders={groupedOrders}
                              isLoading={isLoading}
                              loadingInfo={loadingInfo}
                              allLoading={allLoading}
                              handleDelete={handleDelete}
                              debounceHandleIncrease={debounceHandleIncrease}
                              debounceHandleDecrease={debounceHandleDecrease}
                              countTemporary={countTemporary}
                              infoType="minuman"
                            />
                          </>
                        )
                      )}
                    </>
                  )}
                </>
              )
            ) : (
              <p className="text-center text-neutral-500 dark:text-neutral-300">
                There is no order.
              </p>
            )}
          </div>
        </main>
        {windowWidth < 850 ? (
          <aside className="fixed bottom-0 left-0 right-0 py-2 px-5 rounded-t-xl bg-neutral-100 flex justify-between items-center dark:bg-dark2">
            <div>
              <h1 className="text-neutral-400 -mb-[2px] text-[15px] dark:text-neutral-200">
                Total Pesanan
              </h1>
              <p className="font-bold dark:text-bright">{FormatToIDR(sum)}</p>
            </div>
            <button
              className={`rounded-lg text-sm bg-primary px-2 py-1 text-white font-bold hover:bg-primary/80 ${
                loading && "cursor-not-allowed"
              }`}
              onClick={() => handlePesanan(orders)}
              disabled={loading?.isLoading}
            >
              Pesan Sekarang
            </button>
          </aside>
        ) : (
          <aside className="p-4 shadow-custom rounded-xl flex flex-col self-start dark:bg-dark2">
            <h1 className="font-bold mb-3 dark:text-bright">Total Pesanan</h1>
            <div className="flex justify-between gap-5 pb-2 border-b-[1px] border-neutral-200">
              <h1 className="dark:text-neutral-300">Total</h1>
              <p className="font-bold dark:text-bright">{FormatToIDR(sum)}</p>
            </div>
            <Button
              className={`rounded-xl bg-primary text-white font-bold mt-5 hover:bg-primary/80 w-full flex justify-center items-center ${
                loading.isLoading && "cursor-not-allowed"
              }`}
              onClick={() => handlePesanan(orders)}
              disabled={loading.isLoading}
            >
              Pesan Sekarang
            </Button>
          </aside>
        )}
      </section>
      {orderConfirm && (
        <ModalOrderConfirm
          menuConfirm={orderConfirm}
          setMenuConfirm={setOrderConfirm}
          sum={sum}
          sumBarang={sumBarang}
          session={session}
        />
      )}
    </>
  );
}
export default dynamic(() => Promise.resolve(OrdersView), { ssr: false });
