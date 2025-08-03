import React, { useState } from "react";
import Modal from "../../ui/modal";
import { MenuItem } from "../../interface/menuInterface";

export default function ModalHandleDelete({
  setBoolState,
  deleteFunc,
  id,
  isFromOrder,
  setOrder,
}: {
  setBoolState: React.Dispatch<React.SetStateAction<boolean>>;
  deleteFunc: (id: number | string, isOrder?: boolean) => void;
  id: number | string;
  isFromOrder?: boolean;
  setOrder?: React.Dispatch<React.SetStateAction<MenuItem | null>>;
}) {
  const [close, setClose] = useState(false);
  return (
    <Modal
      onClose={setBoolState}
      closed={close}
      addFnc={() => setOrder?.(null)}
    >
      <h1 className="dark:text-bright mb-3">
        Apakah Kamu Yakin Ingin Menghapus Data Ini?
      </h1>
      <div className="flex justify-end gap-2">
        <button
          className="bg-red-500 px-3 py-1 text-bright rounded-xl"
          onClick={() => {
            setClose(true), setOrder?.(null);
          }}
        >
          Tidak
        </button>
        <button
          className="bg-secondary px-3 py-1 text-bright rounded-xl"
          onClick={() => {
            if (isFromOrder) {
              deleteFunc(id!, true);
            } else {
              deleteFunc(id!);
            }
            setClose(true);
          }}
        >
          Ya
        </button>
      </div>
    </Modal>
  );
}
