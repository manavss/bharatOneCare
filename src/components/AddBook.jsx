import { useEffect, useState } from "react";
import UserDataService from "../services/user.services";
import toast from "react-hot-toast";
import Buttons from "./Buttons";

function AddBook({ id, setUserId, setOpenModal, openModal }) {
  const initialValue = {
    name: "",
    email: "",
    age: 0,
    gender: "Male",
    city: "",
  };

  const [user, setUser] = useState(initialValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    try {
      if (id) {
        await UserDataService.updateUser(id, user);
        setUserId("");
        toast.success("Successfully Edited");
      } else {
        await UserDataService.addUser(user);
        toast.success("Successfully Added");
      }
    } catch (err) {
      console.log(err);
      toast.error("Some Error Occured");
    }
  };

  const handleEdit = async () => {
    try {
      const docSnap = await UserDataService.getUser(id);

      setUser(docSnap.data());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (id !== undefined && id !== "") {
      handleEdit();
    }
  }, [id]);
  return (
    <>
      <div className="  flex w-full justify-between bg-gray-100 px-10 py-4">
        <h1 className=" text-3xl font-medium">Manage Users</h1>
        <button
          onClick={() => {
            setOpenModal(!openModal);
            setUser(initialValue);
          }}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Add
        </button>
      </div>
      <div className="flex items-center justify-center ">
        {openModal && (
          <form
            className=" absolute top-[18%] z-50   mb-4 flex w-[400px] flex-col gap-y-5 rounded bg-white  px-8 pb-8 pt-6 shadow-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-medium text-gray-500">
              Enter User Details
            </h2>
            <div>
              <input
                className="input"
                value={user.name}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Name"
                name="name"
                required
              />
            </div>
            <input
              className="input"
              value={user.email}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter email"
              name="email"
              required
            />
            <input
              className="input"
              value={user.age}
              onChange={handleInputChange}
              type="number"
              placeholder="Enter age"
              name="age"
              required
            />
            <select
              className="focus:shadow-outline w-full  rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              className="input"
              value={user.city}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter city"
              name="city"
              required
            />
            <div className=" flex justify-between">
              <Buttons
                type="submit"
                label="Add/Update"
                styleClass=" rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              />
              <Buttons
                onClick={() => setOpenModal(false)}
                label="Cancel"
                styleClass=" rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default AddBook;
