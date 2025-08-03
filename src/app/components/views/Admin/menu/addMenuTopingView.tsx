import { fncDeleteImage } from "@/app/components/hooks/fncDeleteImage";
import DeleteIcon from "@/app/components/icons/trash";
import { ChoiceItem, MenuItem } from "@/app/components/interface/menuInterface";
import { Session } from "@/app/components/interface/sessionInterface";
import FilterOrderHeading from "@/app/components/layouts/filter/filterOrderHeading";
import ModalHandleDelete from "@/app/components/layouts/modalLayouts/modalHandleDelete";
import { api } from "@/services/axios/axios";
import useWindowWidth from "@/services/windowWidth/services";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddMenuTopingView({
  setAddMenuToping,
  session,
  funcGetData,
  order,
  setOrder,
}: {
  setAddMenuToping: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session;
  funcGetData: () => void;
  order?: MenuItem | null;
  setOrder: React.Dispatch<React.SetStateAction<MenuItem | null>>;
}) {
  const oldName = order?.imageName;
  const [isFromOrder, setIsFromOrder] = useState<boolean>(false);
  const [count, setCount] = useState<number>(
    order?.choice ? order?.choice?.length - 1 : 0
  );
  const [dataOrder, setDataOrder] = useState<null | MenuItem>(order || null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [topingId, setTopingId] = useState<number>(0);
  //   const [imageFiles, setImageFiles] = useState<Record<number, File | null>>({});
  //   const [imageUrls, setImageUrls] = useState<Record<number, string | null>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [topings, setTopings] = React.useState<{ id: number }[]>([]);
  const windowWidth = useWindowWidth();

  const addToping = (id: number) => {
    setTopings((prev: { id: number }[]) => [...prev, { id }]);
  };

  const handleDeleteToping = (index: number, isOrder: boolean = false) => {
    if (isFromOrder) {
      setDataOrder((prev: any) => {
        const newChoice = prev.choice.filter(
          (item: ChoiceItem, i: number) => i !== index
        );

        return {
          ...prev,
          choice: newChoice,
        };
      });
      setIsFromOrder(false);
    } else {
      setTopings((prev: any) => prev.filter((item: any) => item.id !== index));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar.");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 1MB.");
      return;
    }

    if (dataOrder) {
      dataOrder.thumbnail = URL.createObjectURL(file);
    }

    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));

    // setImageFiles((prev) => ({
    //   ...prev,
    //   [id]: file,
    // }));
    // setImageUrls((prev) => ({
    //   ...prev,
    //   [id]: URL.createObjectURL(file),
    // }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (
      Number(formData.get(`price`) ?? 0) < 0 ||
      Number(formData.get(`stock`) ?? 0) < 0
    )
      return toast.error("Harga dan Stok tidak boleh negatif");

    const mainImage = new FormData();
    if (!order && !imageFile) {
      return toast.error("Tambahkan Gambar Produk!");
    }
    const imageName = `${imageFile?.name}-${formData.get(
      "judul"
    )}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    mainImage.append("image", imageFile as File);
    mainImage.append("name", imageName as string);

    const topingsData: any = [];
    for (let i = 1; i <= count; i++) {
      if (formData.get(`judul-${i}`) === null) continue;
      if (
        Number(formData.get(`price-${i}`) ?? 0) < 0 ||
        Number(formData.get(`stock-${i}`) ?? 0) < 0
      )
        return toast.error("Harga dan Stok tidak boleh negatif");
      const data = {
        name: formData.get(`judul-${i}`),
        price: formData.get(`price-${i}`),
        stock: Number(formData.get(`stock-${i}`)),
        type: "checkbox",
      };

      topingsData.push(data);
    }

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        let url;
        if (!order) {
          url = await uploadImage(mainImage);
        } else if (order && imageFile) {
          await fncDeleteImage(oldName!, session);
          url = await uploadImage(mainImage);
        } else {
          url = dataOrder?.thumbnail;
        }

        let data: any = {
          name: formData.get("judul"),
          desc: formData.get("desc"),
          price: formData.get("price"),
          note: "nothing",
          thumbnail: url,
          type: formData.get("type"),
          imageName,
          choice: [
            {
              name: formData.get("judul"),
              stock: Number(formData.get("stock")),
              price: 0,
              priceDisplay: formData.get("price"), //ubah
              checked: true,
              display: url, //thumbnail
              type: "checkbox",
            },
          ],
        };

        data.choice.push(...topingsData);

        let result;
        if (order) {
          data.id = order?.id;
          result = await api.patch("/api/admin/menu", data, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          });
        } else {
          result = await api.post("/api/admin/menu", data, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          });
        }
        if (result?.status === 200) {
          funcGetData();
          setAddMenuToping(false);
          resolve("Berhasil");
          setOrder(null);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

    await toast.promise(savingPromise, {
      loading: "Loading...",
      success: "Berhasil Menambahkan Menu",
      error: "Gagal Menambahkan Menu",
    });
  };

  const uploadImage = async (data: any) => {
    try {
      const result: any = await api.post("/api/admin/menu/image", data, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      return result.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className={`text-primary text-[20px] mt-1 text-center font-bold`}>
        {dataOrder ? "Edit" : "Tambahkan"} Menu Dengan Toping
      </h1>
      <form
        action="submit"
        className="dark:text-bright flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="px-5 py-3 rounded-xl flex flex-col gap-4 dark:bg-dark2 ">
          <section
            className={`flex gap-4  ${
              windowWidth <= 768 && "flex-col items-center"
            }`}
          >
            <label className="" htmlFor={`mainImage`}>
              <div className="w-[150px] h-[150px] rounded-lg flex justify-center items-center relative">
                {dataOrder || imageUrl ? (
                  <Image
                    src={dataOrder?.thumbnail || imageUrl || ""}
                    alt="toping"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <span className="border w-full h-full flex justify-center items-center text-[13px] rounded-xl">
                    Tambahkan Gambar
                  </span>
                )}
              </div>
            </label>
            <input
              type="file"
              id={`mainImage`}
              accept="image/*"
              className="mt-4 dark:text-bright text-[12px] hidden"
              onChange={(e) => handleImageChange(e)}
            />
            <section
              className={`w-full flex gap-4  ${
                windowWidth <= 768 && "flex-col items-center"
              }`}
            >
              <article className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="judul"
                    className="dark:text-bright ml-1 text-[14px]"
                  >
                    Judul <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="judul"
                    maxLength={15}
                    placeholder=""
                    name="judul"
                    defaultValue={dataOrder?.name}
                    className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="price"
                    className="dark:text-bright ml-1 text-[14px]"
                  >
                    Harga <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    id="price"
                    maxLength={15}
                    placeholder=""
                    defaultValue={dataOrder?.price}
                    name="price"
                    className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="stock"
                    className="dark:text-bright ml-1 text-[14px]"
                  >
                    Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    id="stock"
                    maxLength={15}
                    placeholder=""
                    name="stock"
                    defaultValue={dataOrder?.choice[0].stock}
                    className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none"
                  />
                </div>
              </article>
              <article className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="dark:text-bright ml-1 text-[14px]"
                  >
                    Jenis <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    id="type"
                    className="dark:text-black px-2 py-1 rounded-lg outline-none"
                    defaultValue={dataOrder?.type || "makanan"}
                    required
                  >
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="desc"
                    className="dark:text-bright ml-1 text-[14px]"
                  >
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    name="desc"
                    id="desc"
                    maxLength={60}
                    defaultValue={dataOrder?.desc}
                    placeholder=""
                    className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none h-[100px] resize-none"
                  />
                </div>
              </article>
            </section>
          </section>
          <div className="self-end flex gap-4">
            <button
              onClick={() => {
                setAddMenuToping(false), setOrder(null);
              }}
              className={`border border-neutral-300 text-neutral-300 px-2 py-1 rounded-lg hover:bg-neutral-300 hover:text-neutral-700 transition-all duration-200`}
            >
              Kembali
            </button>
            <button
              type="submit"
              className={`dark:text-primary border border-secondary px-2 py-1 rounded-lg hover:bg-secondary hover:text-bright transition-all duration-200`}
            >
              {dataOrder ? "Ubah" : "Tambahkan"}
            </button>
          </div>
        </div>

        <div key={dataOrder?.choice?.length}>
          {dataOrder?.choice?.map((item: any, index: number) => {
            if (index === 0) return null;
            return (
              <React.Fragment key={item.id}>
                <FilterOrderHeading
                  infoType={`Toping ${index}`}
                  animate={false}
                />

                <div
                  className={`px-5 py-3 rounded-xl flex gap-4 dark:bg-dark2  ${
                    windowWidth <= 768 && "flex-col items-center"
                  }`}
                >
                  <article className="flex flex-col gap-2 w-full">
                    <div className={`flex flex-col gap-1`}>
                      <label
                        htmlFor="judul"
                        className="dark:text-bright ml-1 text-[14px]"
                      >
                        Judul <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        id="judul"
                        maxLength={15}
                        defaultValue={item.name}
                        placeholder=""
                        name={`judul-${index}`}
                        className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="price"
                        className="dark:text-bright ml-1 text-[14px]"
                      >
                        Harga <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="number"
                        id="price"
                        maxLength={15}
                        defaultValue={item.price}
                        placeholder=""
                        name={`price-${index}`}
                        className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none"
                      />
                    </div>
                  </article>
                  <article className="flex flex-col gap-2 w-full min-h-full justify-between">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="stock"
                        className="dark:text-bright ml-1 text-[14px]"
                      >
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="number"
                        id="stock"
                        maxLength={15}
                        defaultValue={item.stock}
                        placeholder=""
                        name={`stock-${index}`}
                        className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none"
                      />
                    </div>{" "}
                    <button
                      type="button"
                      className={`bg-red-500 p-1 rounded-lg self-end`}
                      onClick={() => {
                        setTopingId(index);
                        setOpenDeleteModal(true);
                        setIsFromOrder(true);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </article>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* toping */}
        {topings?.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <FilterOrderHeading
              infoType={`${
                order?.choice && dataOrder && order?.choice?.length > 0
                  ? `Toping ${index + 1 + (dataOrder?.choice?.length - 1)}`
                  : `Toping ${index + 1}`
              }`}
            />

            <div
              className={`px-5 py-3 rounded-xl flex gap-4 dark:bg-dark2  ${
                windowWidth <= 768 && "flex-col items-center"
              }`}
            >
              <article className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="judul"
                    className="dark:text-bright ml-1 text-[14px]"
                  >
                    Judul <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="judul"
                    maxLength={15}
                    placeholder=""
                    name={`${
                      order?.choice && order?.choice?.length > 0
                        ? `judul-${index + 1 + (order?.choice?.length - 1)}`
                        : `judul-${index + 1}`
                    }`}
                    className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="price"
                    className="dark:text-bright ml-1 text-[14px]"
                  >
                    Harga <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    id="price"
                    maxLength={15}
                    placeholder=""
                    name={`${
                      order?.choice && order?.choice?.length > 0
                        ? `price-${index + 1 + (order?.choice?.length - 1)}`
                        : `price-${index + 1}`
                    }`}
                    className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none"
                  />
                </div>
              </article>
              <article className="flex flex-col gap-2 w-full min-h-full justify-between">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="stock"
                    className="dark:text-bright ml-1 text-[14px]"
                  >
                    Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    id="stock"
                    maxLength={15}
                    placeholder=""
                    name={`${
                      order?.choice && order?.choice?.length > 0
                        ? `stock-${index + 1 + (order?.choice?.length - 1)}`
                        : `stock-${index + 1}`
                    }`}
                    className="dark:text-black dark:bg-bright px-2 py-1 rounded-lg outline-none"
                  />
                </div>{" "}
                <button
                  type="button"
                  className={`bg-red-500 p-1 rounded-lg self-end`}
                  onClick={() => {
                    setTopingId(item.id);
                    setOpenDeleteModal(true);
                  }}
                >
                  <DeleteIcon />
                </button>
              </article>
            </div>
          </React.Fragment>
        ))}
        {/* toping end */}
      </form>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
          addToping(count);
        }}
        className="w-full border border-neutral-300 text-neutral-300 p-1 rounded-xl hover:bg-neutral-300 hover:text-neutral-700 transition-all duration-200"
      >
        + Tambahkan Toping
      </button>

      {openDeleteModal && (
        <ModalHandleDelete
          id={topingId}
          setBoolState={setOpenDeleteModal}
          deleteFunc={(id) => handleDeleteToping(id as number)}
          isFromOrder={isFromOrder}
        />
      )}
    </>
  );
}
