import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../authentication/authSlice";
import { loginRoute } from "../utils/APIRoute";
import { useDispatch } from "react-redux";
import logo from "/logo.png";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            const response = await axios.post(loginRoute, user)
            if (response.status === 200) {
                const userData = response.data.user;
                localStorage.setItem("token", response.data.token)
                toast.success("Login successful");
                dispatch(login({user: userData}))
                navigate("/chat");
            } else {
                toast.error("Unexpected response data",{
                  position: "top-left"
                });
            }
        } catch (error) {
            toast.error("Invalid Login!!",{
              position: "top-left"
            })
            console.log(error)
        }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-400 to-purple-300 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="p-8 rounded-lg max-w-md w-full shadow-2xl ">
        <div className="flex justify-center items-center">
        <img src={logo} alt="chat app logo" className="w-20 h-auto" />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Login to your account
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
                className="appearance-none relative block w-full px-3 py-3 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                className="appearance-none relative block w-full px-3 py-3 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="flex justify-center text-md uppercase mt-2 font-semibold">
            <span>Don't have an account?</span>
            <Link to="/register" className="ml-2 ">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
