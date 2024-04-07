"use client";
import { useSession } from "next-auth/react";
import ProfileView from "../components/views/Profile/profileViews";

export default function ProfilePage() {
  const { data: session, update, status }: any = useSession();
  return <ProfileView session={session} update={update} status={status} />;
}
