"use client";
import { useSession } from "next-auth/react";
import ProfileView from "../components/views/Profile/profileViews";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { data: session, update, status }: any = useSession();
  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <ProfileView session={session} update={update} status={status} />
    </motion.div>
  );
}
