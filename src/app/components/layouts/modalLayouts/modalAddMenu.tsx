import { useState } from "react";
import Modal from "../../ui/modal";

export function ModalAddMenu({
  setAddMenu,
  setAddMenuWithoutToping,
  setAddMenuToping,
}: {
  setAddMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setAddMenuWithoutToping: React.Dispatch<React.SetStateAction<boolean>>;
  setAddMenuToping: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [close, setClose] = useState(false);
  return (
    <Modal onClose={() => setAddMenu(false)} closed={close}>
      <h1 className={`dark:text-bright mb-5`}>Tambahkan Menu</h1>
      <div className="flex justify-between gap-4">
        <button
          onClick={() => {
            setAddMenuToping(true);
            setClose(true);
          }}
          className={`dark:text-primary border border-secondary px-2 py-1 rounded-lg hover:bg-secondary hover:text-bright transition-all duration-200`}
        >
          Gunakan Toping
        </button>
        <button
          onClick={() => {
            setAddMenuWithoutToping(true);
            setClose(true);
          }}
          className={`dark:text-primary border border-secondary px-2 py-1 rounded-lg hover:bg-secondary hover:text-bright transition-all duration-200`}
        >
          Tanpa Toping
        </button>
      </div>
    </Modal>
  );
}
