import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../authentication/authSlice";
import { loginRoute } from "../utils/APIRoute";
import { useDispatch } from "react-redux";
import logo from "/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginRoute, user);
      if (response.status === 200) {
        const userData = response.data.user;
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");
        dispatch(login({ user: userData }));
        if (userData.isAvatarImageSet) {
          navigate("/welcome");
        } else {
          navigate("/set-avatar");
        }
        
      } else {
        toast.error("Unexpected response data");
      }
    } catch (error) {
      toast.error("Invalid Login!!");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor:"#FAACA8",
    backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)"}} >
      <Toaster position="top-left" />
      <div className="p-8 rounded-lg max-w-md w-full border-2 border-black shadow-2xl ">
        <div className="flex justify-center items-center">
          <img src={logo} alt="chat app logo" className="w-20 h-auto mr-10 shadow-2xl rounded-full" />
          <h2 className="mt-6 mr-4 text-center text-3xl font-bold text-gray-900">
            Welcome Back!!
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-3 my-2 border-2 border-black placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm"
                placeholder="Email address"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-3 my-2 border-2 border-black placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 uppercase tracking-wide"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="flex justify-center text-md uppercase mt-4 font-semibold">
          <span>Don't have an account?</span>
          <Link to="/register" className="ml-2">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
