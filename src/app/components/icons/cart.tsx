import { clearNotification, orderCount } from "@/app/redux/notificationSlice";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartIcon({
  className,
  session,
}: {
  className?: string;
  session?: any;
}) {
  const pathname = usePathname();
  const redux = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [displayNotif, setDisplayNotif] = React.useState(0);
  const getNotifCount = useCallback(async () => {
    const res = await fetch(
      `api/users/getCount/ordersCount?email=${session?.user?.email}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await res.json();
    setDisplayNotif(data?.count || 0);
    dispatch(orderCount(data.count || 0));
  }, [dispatch, session?.accessToken, session?.user?.email]);

  useEffect(() => {
    if (redux.notifications.notificationOrder) {
      getNotifCount();
    }
    dispatch(clearNotification());
  }, [dispatch, getNotifCount, redux.notifications.notificationOrder]);
  useEffect(() => {
    getNotifCount();
  }, [getNotifCount]);
  return (
    <div className="relative group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-10 group-hover:text-primary transition-all duration-200 ${className} ${
          pathname == "/orders" && "text-primary dark:text-primary"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      {displayNotif != undefined && displayNotif > 0 && (
        <div
          className={`bg-red-500 rounded-full absolute -top-[5px] right-2 flex text-white justify-center items-center text-[12px] ${
            displayNotif >= 100
              ? "w-6 h-4"
              : displayNotif >= 10
              ? "w-5 h-4"
              : "w-4 h-4"
          }`}
        >
          {displayNotif >= 99 ? "99+" : displayNotif}
        </div>
      )}
    </div>
  );
}
