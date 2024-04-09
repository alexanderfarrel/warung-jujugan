"use client";
import { useState } from "react";
import Modal from "../../ui/modal";
import { useDispatch } from "react-redux";
import { notifAnnouncement } from "@/app/redux/store";

export default function ModalAnnouncement() {
  const [closed, setClosed] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <Modal onClose={() => dispatch(notifAnnouncement())} closed={closed}>
      <div className="text-white max-w-xs">
        <h1 className="text-3xl font-bold">
          Selamat Datang Di Warung Jujugan 😁
        </h1>
        <p className="font-thin my-3">
          Website ini masih dalam tahap pengembangan jadi semua fitur seperti
          memesan makanan dan minuman masih belum tersedia namun sudah bisa kamu
          coba!
        </p>
        <button
          className="bg-secondary w-full py-2 text-bright rounded-xl"
          onClick={() => setClosed(true)}
        >
          Okay
        </button>
      </div>
    </Modal>
  );
}
