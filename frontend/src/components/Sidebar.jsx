import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import OtherUsers from "./OtherUsers";

const Sidebar = () => {
  const handleSearch = () => {toast.success("Woah!!")}
  return (
    <div>
      <Toaster position="top-left" />
      <form action="">
        <div className="relative m-5">
          <input
            type="text"
            placeholder="Search.."
            className="input input-bordered rounded-full px-6 py-3 w-full"
          />
          <IoSearchOutline
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black text-xl cursor-pointer hover:text-2xl"
            onClick={handleSearch}
          />
        </div>
        <hr className="border-gray-600 border" />
      </form>
      <OtherUsers />
    </div>
  );
};

export default Sidebar;
