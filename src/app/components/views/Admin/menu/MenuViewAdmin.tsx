import EditIcon from "@/app/components/icons/edit";
import DeleteIcon from "@/app/components/icons/trash";
import { MenuItem } from "@/app/components/interface/menuInterface";
import { Session } from "@/app/components/interface/sessionInterface";
import FilterOrderHeading from "@/app/components/layouts/filter/filterOrderHeading";
import { ModalAddMenu } from "@/app/components/layouts/modalLayouts/modalAddMenu";
import { api } from "@/services/axios/axios";
import FormatToIDR from "@/services/formatter/formatToIDR";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ModalHandleDelete from "@/app/components/layouts/modalLayouts/modalHandleDelete";
import AddMenuTopingView from "./addMenuTopingView";
import AddMenuView from "./addMenuView";
import { fncDeleteImage } from "@/app/components/hooks/fncDeleteImage";

interface grouped {
  [key: string]: MenuItem[];
}

export default function MenuAdminView(props: { session: Session }) {
  const { session } = props;
  const [addMenu, setAddMenu] = useState<boolean>(false);
  const [addMenuToping, setAddMenuToping] = useState<boolean>(false);
  const [isToping, setIsToping] = useState<boolean>(false);
  const [order, setOrder] = useState<MenuItem | null>(null);
  const [deleteMenu, setDeleteMenu] = useState<boolean>(false);
  const [idMenu, setIdMenu] = useState<string>("");
  const [addMenuWithoutToping, setAddMenuWithoutToping] =
    useState<boolean>(false);
  const [data, setData] = useState<MenuItem[]>([]);
  const getData = useCallback(() => {
    api
      .get("/api/admin/menu", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [session?.accessToken]);

  useEffect(() => {
    getData();
  }, [getData]);

  const groupedOrders = data.reduce((grouped: grouped, order: MenuItem) => {
    const orderType = order.type || "default";
    grouped[orderType] = grouped[orderType] || [];
    grouped[orderType].push(order);
    return grouped;
  }, {});

  const handleEdit = (order: MenuItem) => {
    setOrder(order);
    if (order.note === "nothing") {
      setAddMenuToping(true);
    } else if (order.note === "choiceOne") {
      setAddMenuWithoutToping(true);
    }
  };

  const handleDelete = (id: string) => {
    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        if (!isToping) {
          for (let i = 1; i < order?.choice.length!; i++) {
            await fncDeleteImage(order?.choice[i].imageName!, session);
          }
        }

        const res = await api.delete(
          `/api/admin/menu?id=${id}&imageName=${order?.imageName}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (res.status === 200) {
          getData();
          resolve(res);
        }
      } catch (error) {
        reject(error);
      } finally {
        setIsToping(false);
        setOrder(null);
      }
    });

    toast.promise(savingPromise, {
      loading: "Menghapus...",
      success: "Berhasil Menghapus Menu",
      error: "kayanya ada yang error",
    });
  };

  return (
    <>
      <section
        className={`${
          addMenuToping || addMenuWithoutToping ? "hidden" : "flex"
        } flex-col max-w-4xl mt-2`}
      >
        <div className="w-full flex justify-between mb-2">
          <button
            onClick={() => setAddMenu(true)}
            className="dark:text-bright bg-secondary rounded-lg px-2 py-1 hover:bg-secondary/80"
          >
            +Tambahkan
          </button>
          <input
            type="text"
            className="text-dark bg-white rounded-lg px-2 py-1 outline-none dark:bg-dark2 dark:text-bright"
            placeholder="Cari Menu..."
          />
        </div>

        {groupedOrders.makanan?.length > 0 ||
        groupedOrders.minuman?.length > 0 ? (
          <>
            {groupedOrders.makanan?.length > 0 && (
              <FilterOrderHeading infoType={"Makanan"}></FilterOrderHeading>
            )}
            {/* Makanan */}
            {groupedOrders.makanan?.map((order: MenuItem, index: number) => (
              <>
                <div
                  key={index}
                  className="dark:text-bright p-3 rounded-xl flex bg-dark2 max-w-4xl gap-5 mb-4 mt-2"
                >
                  <aside>
                    <Image
                      src={order.thumbnail}
                      alt={order.name}
                      width={130}
                      height={130}
                    />
                  </aside>
                  <article className="flex flex-col w-full min-h-full justify-between p-2">
                    <span>
                      <div className="flex justify-between items-center">
                        <h1>{order.name}</h1>
                        <p className="text-[13px] mr-4 text-neutral-200">
                          Stock : {order.choice[0].stock}
                        </p>
                      </div>
                      <p>{FormatToIDR(order.price)}</p>
                    </span>
                    <span className="flex gap-2 self-end">
                      <button
                        className={`bg-yellow-500 p-1 rounded-lg`}
                        onClick={() => handleEdit(order)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className={`bg-red-500 p-1 rounded-lg`}
                        onClick={() => {
                          setDeleteMenu(true);
                          setIdMenu(order.id!);
                          setOrder(order);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </span>
                  </article>
                </div>
              </>
            ))}

            {groupedOrders.minuman?.length > 0 && (
              <FilterOrderHeading infoType={"Minuman"}></FilterOrderHeading>
            )}
            {groupedOrders.minuman?.map((order: MenuItem, index: number) => (
              <>
                {/* Minuman */}
                <div
                  key={index}
                  className="dark:text-bright p-3 rounded-xl flex bg-dark2 max-w-4xl gap-5 mb-4 mt-2"
                >
                  <aside>
                    <Image
                      src={order.thumbnail}
                      alt="Juice Alpukat"
                      width={130}
                      height={130}
                    />
                  </aside>
                  <article className="flex flex-col w-full min-h-full justify-between p-2">
                    <span>
                      <div className="flex justify-between items-center">
                        <h1>{order.name}</h1>
                        <p className="text-[13px] mr-4 text-neutral-200">
                          Stock : {order.choice[0].stock}
                        </p>
                      </div>
                      <p>{FormatToIDR(order.price)}</p>
                    </span>
                    <span className="flex gap-2 self-end">
                      <button
                        className={`bg-yellow-500 p-1 rounded-lg`}
                        onClick={() => handleEdit(order)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className={`bg-red-500 p-1 rounded-lg`}
                        onClick={() => {
                          if (order.note == "nothing") {
                            setIsToping(true);
                          } else {
                            setIsToping(false);
                          }
                          setDeleteMenu(true);
                          setIdMenu(order.id!);
                          setOrder(order);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </span>
                  </article>
                </div>
              </>
            ))}
          </>
        ) : (
          <div className="text-center text-primary font-medium text-xl">
            Tidak Ada Menu
          </div>
        )}
      </section>

      {addMenuToping && (
        <AddMenuTopingView
          funcGetData={getData}
          setAddMenuToping={setAddMenuToping}
          session={session}
          order={order}
          setOrder={setOrder}
        ></AddMenuTopingView>
      )}

      {addMenuWithoutToping && (
        <AddMenuView
          funcGetData={getData}
          setAddMenuWithoutToping={setAddMenuWithoutToping}
          session={session}
          order={order}
          setOrder={setOrder}
        />
      )}

      {addMenu && (
        <ModalAddMenu
          setAddMenu={setAddMenu}
          setAddMenuWithoutToping={setAddMenuWithoutToping}
          setAddMenuToping={setAddMenuToping}
        ></ModalAddMenu>
      )}

      {deleteMenu && (
        <ModalHandleDelete
          setOrder={setOrder}
          deleteFunc={(id) => handleDelete(id as string)}
          setBoolState={setDeleteMenu}
          id={idMenu!}
        ></ModalHandleDelete>
      )}
    </>
  );
}
