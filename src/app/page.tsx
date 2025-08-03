import { Metadata } from "next";
import HomePageViews from "./components/views/home/HomePageViews";
import React from "react";

export const metadata: Metadata = {
  title: "Warung Jujugan",
  description: "Warung Jujugan ",
  icons: {
    icon: "/logo/jujugan2.ico",
  },
};

export default function Home() {
  return (
    <React.StrictMode>
      <HomePageViews />
    </React.StrictMode>
  );
}
