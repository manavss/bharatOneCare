import { useEffect, useState } from "react";
import UserDataService, { userCollectionRef } from "../services/user.services";

import toast from "react-hot-toast";
import { onSnapshot } from "firebase/firestore";
import Buttons from "./Buttons";

function BookList({ getUserId, openModal }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
      let usersData = [];
      snapshot.docs.forEach((doc) => {
        usersData.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async (id) => {
    await UserDataService.deleteUser(id);
    toast.success("Deleted");
  };

  return (
    <div
      className={`relative z-10 mt-10 px-10 ${openModal ? "opacity-50" : ""}`}
    >
      <table className=" w-full table-auto border text-left text-base font-semibold text-gray-500">
        <thead className="bg-gray-50 text-base uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Age</th>
            <th className="px-6 py-3">Gender</th>
            <th className="px-6 py-3">City</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody className="border bg-white ">
          {users &&
            users.map((u) => {
              return (
                <tr key={u.id} className=" border-b ">
                  <td className="px-6 py-4">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">{u.age}</td>
                  <td className="px-6 py-4">{u.gender}</td>
                  <td className="px-6 py-4">{u.city}</td>
                  <td className=" mr-2 flex items-center gap-x-2">
                    {/* <button
                      onClick={() => getUserId(u.id)}
                      className="my-4 rounded-sm bg-green-600 px-3 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="rounded-sm bg-green-600 px-3 text-white"
                    >
                      Delete
                    </button> */}
                    <Buttons
                      label="Edit"
                      onClick={() => getUserId(u.id)}
                      styleClass="my-4 rounded-sm bg-green-600 px-3 text-white"
                    />
                    <Buttons
                      label="Delete"
                      onClick={() => handleDelete(u.id)}
                      styleClass="rounded-sm bg-red-600 px-3 text-white"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
