import Image from "next/image";
import DeleteIcon from "../../icons/trash";
import FormatToIDR from "@/services/formatter/formatToIDR";

export default function FilterOrder({
  order,
  index,
  groupedOrders,
  isLoading,
  loadingInfo,
  allLoading,
  handleDelete,
  debounceHandleDecrease,
  debounceHandleIncrease,
  countTemporary,
  infoType,
}: {
  order: any;
  index: number;
  groupedOrders: any;
  isLoading: any;
  loadingInfo: any;
  allLoading: any;
  handleDelete: any;
  debounceHandleDecrease: any;
  debounceHandleIncrease: any;
  countTemporary: any;
  infoType: string;
}) {
  const IsLoading = isLoading.isLoading;
  const LoadingInfo = loadingInfo.loadingInfo;
  const AllLoading = allLoading.allLoading;
  return (
    <>
      <div className="flex" key={order.id}>
        <div className="">
          {order.note != "nothing" ? (
            <Image
              src={order.topingChecked[0].display}
              alt={order.name}
              width={100}
              height={100}
            ></Image>
          ) : (
            <Image
              src={
                order.topingChecked[0].thumbnail ||
                order.topingChecked[0].display
              }
              alt={order.name}
              width={100}
              height={100}
            ></Image>
          )}
        </div>
        <div
          className={`flex flex-col w-full items-center px-2 pb-3 pt-2 gap-2 ${
            infoType == "makanan"
              ? groupedOrders.makanan.length - 1 !== index &&
                "border-b-2 border-neutral-300"
              : groupedOrders.minuman.length - 1 !== index &&
                "border-b-2 border-neutral-300"
          }`}
        >
          <div className="flex justify-between w-full gap-2">
            {" "}
            <div className="flex flex-col text-[15px]">
              <h1 className="font-semibold dark:text-bright">{order.name}</h1>
              {order.note == "nothing" &&
                order.topingChecked &&
                order.topingChecked.map((toping: any, index: number) => (
                  <>
                    {toping.disabled != true && (
                      <p
                        key={index}
                        className="text-neutral-500 dark:text-neutral-300"
                      >
                        + {toping.name}
                      </p>
                    )}
                  </>
                ))}
            </div>
            <div className="flex flex-col text-[15px]">
              <h1 className="font-semibold dark:text-neutral-300">
                {order.note == "nothing"
                  ? FormatToIDR(order.price)
                  : FormatToIDR(order.topingChecked[0].price)}
              </h1>
              {order.note == "nothing" &&
                order.topingChecked &&
                order.topingChecked.map((toping: any, index: number) => (
                  <>
                    {toping.disabled != true && (
                      <p key={index} className="dark:text-neutral-300">
                        + {FormatToIDR(toping.price)}
                      </p>
                    )}
                  </>
                ))}
            </div>{" "}
          </div>
          <div className="flex justify-end items-center gap-5 w-full">
            <div>
              <button
                className={`bg-red-500/80 p-[6px] rounded-lg ${
                  IsLoading && "hover:cursor-not-allowed"
                } hover:bg-red-500/60`}
                onClick={() => handleDelete(order)}
                disabled={IsLoading}
              >
                <DeleteIcon className="text-slate-200 w-5" />
              </button>
            </div>
            <div className="flex gap-2 border border-neutral-200 rounded-lg p-1">
              <button
                disabled={
                  IsLoading && (LoadingInfo[order.id] != true || AllLoading)
                }
                className={`px-2 py-0 text-primary ${
                  IsLoading &&
                  (LoadingInfo[order.id] != true || AllLoading) &&
                  "cursor-not-allowed"
                }`}
                onClick={() => debounceHandleDecrease(order)}
              >
                -
              </button>
              <p className="text-neutral-500 dark:text-bright">
                {/* {countTemporary[order.id] !== undefined
                  ? countTemporary[order.id]
                  : order.count} */}
                {order.count}
              </p>
              <button
                disabled={
                  IsLoading && (LoadingInfo[order.id] != true || AllLoading)
                }
                className={`px-2 py-0 text-primary ${
                  IsLoading &&
                  (LoadingInfo[order.id] != true || AllLoading) &&
                  "cursor-not-allowed"
                }`}
                onClick={() => debounceHandleIncrease(order)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
