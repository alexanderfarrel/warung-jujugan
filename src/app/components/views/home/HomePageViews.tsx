"use client";
import About from "../About";
import Contact from "../Contact";
import Hero from "../Hero";
import HomeMenu from "../HomeMenu";
import ModalAnnouncement from "../../layouts/modalLayouts/modalAnnouncement";
import { useSelector } from "react-redux";

export default function HomePageViews() {
  const redux = useSelector((state: any) => state);
  return (
    <>
      <Hero />
      <HomeMenu />
      <About />
      <Contact />
      {redux?.notifications?.announcement && <ModalAnnouncement />}
    </>
  );
}
