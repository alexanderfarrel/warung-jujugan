"use client";
import { useCallback, useState } from "react";
import FilterList from "../components/layouts/filter/filterList";
import UserAdminView from "../components/views/Admin/Users/userView";
import OrdersAdminView from "../components/views/Admin/orders/ordersView";
import { useSession } from "next-auth/react";
import HistoryViewAdmin from "../components/views/Admin/history/HistoryViewAdmin";
import formatOrders from "@/services/formatter/formatOrders";
import { motion } from "framer-motion";
import MenuAdminView from "../components/views/Admin/menu/MenuViewAdmin";

export default function AdminPage() {
  const { data: session }: any = useSession();
  const [saring, setSaring] = useState<string>("Orders");
  const [dataSaring, setDataSaring] = useState<any>("Semua");

  const getUserData = useCallback(async (data: any, accessToken: string) => {
    const res = await fetch("/api/admin/orders/user", {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status) {
      return formatOrders(result.data).sort(
        (a: any, b: any) => b.time - a.time
      );
    }
  }, []);

  const getData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders", {
        cache: "no-store",
      });
      const result = await res.json();
      const data = await getUserData(result, session?.accessToken);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [getUserData, session?.accessToken]);

  return (
    <>
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="mt-20 flex flex-col gap-3">
          <h1 className="text-3xl sm1:text-xl sm0:text-xl dark:text-bright">
            Dashboard Admin
          </h1>
          <FilterList
            list={[
              { Orders: ["Semua", "Menunggu", "Diproses", "Dibatalkan"] },
              "History",
              "Users",
              "Menu",
            ]}
            setDataSaring={setDataSaring}
            setSaring={setSaring}
            dataSaring={dataSaring}
            title="Page : "
          />
          {saring == "Orders" && (
            <OrdersAdminView
              session={session}
              dataSaring={dataSaring}
              getData={getData}
            />
          )}
          {saring == "History" && (
            <HistoryViewAdmin session={session} getData={getData} />
          )}
          {saring == "Users" && <UserAdminView />}
          {saring == "Menu" && <MenuAdminView session={session} />}
        </div>
      </motion.div>
    </>
  );
}
