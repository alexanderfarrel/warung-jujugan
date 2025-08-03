import toast from "react-hot-toast";
import Modal from "../../ui/modal";
import { useSession } from "next-auth/react";
import Button from "../../ui/Button";
import { useState } from "react";

export default function ModalDeletedUser({
  deletedUser,
  setDeletedUser,
  setUsers,
}: any) {
  const { data }: any = useSession();
  const [closed, setClosed] = useState<boolean>(false);
  const handleDelete = async (id: any) => {
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.accessToken}`,
        },
        body: JSON.stringify({ id }),
      });
      if (res.status === 200) {
        const result = await fetch("/api/admin/users");
        const data = await result.json();
        setUsers(data);
        setClosed(true);
        resolve(true);
      } else {
        reject();
      }
    });
    toast.promise(savingPromise, {
      loading: "Menghapus...",
      success: "Berhasil Menghapus User",
      error: "kayanya ada yang error",
    });
  };
  return (
    <Modal onClose={() => setDeletedUser("")} closed={closed}>
      <h1 className="dark:text-bright">
        Apakah Kamu Yakin Ingin Menghapus User{" "}
        <span className="font-bold">{deletedUser?.username}</span> ?
      </h1>
      <Button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mt-4"
        onClick={() => handleDelete(deletedUser?.id)}
      >
        Hapus
      </Button>
    </Modal>
  );
}
