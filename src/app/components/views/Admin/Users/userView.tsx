import EditIcon from "@/app/components/icons/edit";
import DeleteIcon from "@/app/components/icons/trash";
import ModalDeletedUser from "@/app/components/layouts/modalLayouts/modalDeletedUser";
import ModalUpdatedUsers from "@/app/components/layouts/modalLayouts/modalUpdatedUsers";
import { useEffect, useState } from "react";
export default function UserAdminView() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState<any>("");
  const [deletedUser, setDeletedUser] = useState<any>("");
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    };
    getUsers();
  }, []);
  return (
    <>
      <div className="max-w-4xl rounded-xl overflow-hidden">
        <table className="w-full dark:text-bright">
          <thead className="sm1:hidden sm0:hidden">
            <tr className="bg-neutral-200 h-14 dark:bg-dark2">
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="sm1:block sm0:block">
            {users?.map((user: any) => (
              <tr
                key={user.id}
                className="text-center h-14 even:bg-neutral-200 dark:even:bg-dark2
                  
                  sm0:even:bg-white sm0:h-full sm1:h-full sm0:block sm0:mb-4 sm0:border sm0:border-gray sm0:p-4 sm0:rounded-xl
                  
                  sm1:even:bg-white sm1:bg-white sm1:block sm1:mb-4 sm1:border sm1:border-gray sm1:p-4 sm1:rounded-xl"
              >
                <td
                  className="sm1:block sm1:text-right sm1:relative sm1:before:content-[attr(data-user)] sm1:before:absolute sm1:before:left-0 sm1:before:text-primary sm1:before:font-semibold
                    
                    sm0:block sm0:text-right sm0:relative sm0:before:content-[attr(data-user)] sm0:before:absolute sm0:before:left-0 sm0:before:text-primary sm0:before:font-semibold"
                  data-user="Username"
                >
                  {user.username}
                </td>
                <td
                  className="sm1:block sm1:text-right sm1:relative sm1:before:content-[attr(data-user)] sm1:before:absolute sm1:before:left-0 sm1:before:text-primary sm1:before:font-semibold sm0:block sm0:text-right sm0:relative sm0:before:content-[attr(data-user)] sm0:before:absolute sm0:before:left-0 sm0:before:text-primary sm0:before:font-semibold"
                  data-user="Email"
                >
                  {user.email}
                </td>
                <td
                  className="sm1:block sm1:text-right sm1:relative sm1:before:content-[attr(data-user)] sm1:before:absolute sm1:before:left-0 sm1:before:text-primary sm1:before:font-semibold sm0:block sm0:text-right sm0:relative sm0:before:content-[attr(data-user)] sm0:before:absolute sm0:before:left-0 sm0:before:text-primary sm0:before:font-semibold"
                  data-user="Role"
                >
                  {user.role}
                </td>
                <td className="flex justify-center items-center h-14 gap-2">
                  <button
                    onClick={() => setEditUser(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-[7px] px-[9px] rounded-lg sm1:px-2 sm1:py-1 sm0:px-2 sm0:py-1"
                  >
                    <EditIcon className="sm1:w-5 sm0:w-5" />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-[7px] px-[9px] rounded-lg sm1:px-2 sm1:py-1 sm0:px-2 sm0:py-1"
                    onClick={() => setDeletedUser(user)}
                  >
                    <DeleteIcon className="sm1:w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editUser && (
        <ModalUpdatedUsers
          updatedUser={editUser}
          setUpdatedUser={setEditUser}
          setUsersData={setUsers}
        />
      )}
      {deletedUser && (
        <ModalDeletedUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsers={setUsers}
        />
      )}
    </>
  );
}
