"use client";
import { useSession } from "next-auth/react";
import HistoryView from "../components/views/History/HistoryView";

export default function HistoryPage() {
  const { data: session } = useSession();
  return <HistoryView session={session} />;
}
