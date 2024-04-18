import React from "react";
import { Link } from "react-router-dom";
import chat_illustration from "../assets/chat_illustration.png";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-violet-200 to-pink-200 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Welcome to Chat App
      </h1>
      <img
        src={chat_illustration}
        alt="Chat Illustration"
        className="mb-8"
        style={{ width: "300px" }}
      />
      <div className="flex space-x-4">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
          <Link to="/login" className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Login
          </Link>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
          <Link to="/register" className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Register
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
