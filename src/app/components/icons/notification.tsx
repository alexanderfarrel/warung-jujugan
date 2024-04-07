import {
  clearNotification,
  historyCount,
  statusCount,
} from "@/app/redux/store";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface NotificationProps {
  className?: string;
  session?: any;
}

const Notification: React.FC<NotificationProps> = ({ className, session }) => {
  const pathname = usePathname();
  const [displayNotif, setDisplayNotif] = React.useState(0);
  const redux = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const getNotifCount = useCallback(async () => {
    const res = await fetch(
      `api/users/getCount/statusCount?email=${session?.user?.email}`,
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
    setDisplayNotif(data?.count?.status || 0);
    dispatch(statusCount(data?.count?.status || 0));
    dispatch(historyCount(data?.count.history || 0));
  }, [dispatch, session?.accessToken, session?.user?.email]);

  useEffect(() => {
    if (redux.notifications.notificationStatus) {
      getNotifCount();
    }
    dispatch(clearNotification());
  }, [dispatch, getNotifCount, redux.notifications.notificationStatus]);
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
        className={`w-5 ${className} group-hover:text-primary transition-all duration-200 ${
          pathname == "/status" && "text-primary dark:text-primary"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.640 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
        />
      </svg>
      {displayNotif != undefined && displayNotif > 0 && (
        <div
          className={`bg-red-500 rounded-full absolute -top-[5px] -right-[1px] flex text-white justify-center items-center text-[12px] ${
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
};

export default Notification;
