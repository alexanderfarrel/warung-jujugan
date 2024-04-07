"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import OrdersView from "../components/views/Orders/OrdersView";
import { motion } from "framer-motion";

export default function Orders() {
  const { data: session, update }: any = useSession();
  const [orders, setOrders] = useState<any>([]);
  const [countTemporary, setCountTemporary] = useState<any>({});
  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <OrdersView
        session={session}
        orders={orders}
        setOrders={setOrders}
        countTemporary={countTemporary}
        setCountTemporary={setCountTemporary}
        update={update}
      />
    </motion.div>
  );
}
