import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const HomePage = () => {
  return (
    <div className="bg-black w-full h-screen flex justify-center items-center">
      <div className="w-[60%] h-[35rem] ml-auto mr-auto flex flex-col lg:flex-row bg-slate-400 rounded-xl ">
        <div className="w-full lg:w-[30%] h-full bg-gray-700 text-white rounded-l-xl">
          <Sidebar />
        </div>
        <div className="w-full lg:w-3/4 h-full bg-slate-500 rounded-r-xl">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
