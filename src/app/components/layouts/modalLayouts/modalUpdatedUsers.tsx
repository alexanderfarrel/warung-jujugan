import { useState } from "react";
import Modal from "../../ui/modal";
import { useSession } from "next-auth/react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function ModalUpdatedUsers(props: any) {
  const { data }: any = useSession();
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [closed, setClosed] = useState<boolean>(false);

  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    if (error) return;
    setIsloading(true);
    const form: any = e.target as HTMLFormElement;
    const dataUser = {
      id: updatedUser.id,
      username: form.username.value,
      role: form.role.value,
    };
    try {
      const result = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.accessToken}`,
        },
        body: JSON.stringify(dataUser),
      });
      if (result.status === 200) {
        setIsloading(false);
        const data: any = await fetch("/api/users");
        const dataJson = await data.json();
        setUsersData(dataJson);
        setClosed(true);
      } else {
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputUsername = (e: any) => {
    if (e.target.value.length === 15) {
      setError("Maks 15 Char");
    } else {
      setError("");
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser("")} closed={closed}>
      <h1 className="text-xl mb-2 dark:text-bright">Update User</h1>
      <form onSubmit={handleUpdateUser} className="w-72 p-2">
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={handleInputUsername}
          defaultValue={updatedUser.username}
          maxLength={15}
          spellCheck={false}
          error={error}
          className="mb-3"
        />
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          defaultValue={updatedUser.email}
          disabled
        ></Input>
        <select
          name="role"
          id="role"
          defaultValue={updatedUser.role}
          className="w-full py-2 mb-4 mt-3 rounded-lg px-2 cursor-pointer outline-none dark:bg-dark2 dark:text-bright"
        >
          <option key={"admin"} value="admin" id="admin">
            Admin
          </option>
          <option key={"user"} value="user" id="user">
            User
          </option>
        </select>
        <Button
          type="submit"
          disabled={isLoading || error.length > 0}
          className="rounded-xl mt-4 bg-primary text-white hover:bg-primary/80 disabled:cursor-not-allowed"
        >
          Update
        </Button>
      </form>
    </Modal>
  );
}
