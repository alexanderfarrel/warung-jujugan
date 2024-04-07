"use client";

import { useSession } from "next-auth/react";
import StatusView from "../components/views/Status/StatusView";
import { motion } from "framer-motion";

export default function StatusPage() {
  const { data: session }: any = useSession();
  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <StatusView session={session} />
    </motion.div>
  );
}
