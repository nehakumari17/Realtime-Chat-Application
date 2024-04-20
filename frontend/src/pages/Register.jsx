import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import toast, { Toaster } from "react-hot-toast";
import { registerRoute } from "../utils/APIRoute";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const [gender, setGender] = useState("male");

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (user.password !== user.confirmPassword) {
      toast.error("Password and confirm password should match");
      isValid = false;
    }
    if (user.username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      isValid = false;
    }
    if (user.password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.");
      isValid = false;
    }
    if (user.email === "") {
      toast.error("Email is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(registerRoute, user);
      if (response.status === 200) {

        setUser({
          name: "",
          email: "",
          password: "",
        });

        toast.success("Registration Successful!", {
          icon: "👏",
        });

        navigate("/login");

      } else {
        toast.error("Unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "User already exists with this email"
        ) {
          toast.error("User already exists with this email.");
        } else {
          toast.error("Unexpected error occurred. Please try again later.");
        }
      } else if (error.request) {
        toast.error(
          "No response received from server. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor:" #FAACA8",
      backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)"
      
      }}>
      <Toaster position="top-left" />
      <div className="p-8 rounded-lg max-w-md w-full shadow-2xl">
        <div className="flex justify-center">
          <img src={logo} alt="chat app logo" className="w-20 h-auto mr-2" />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none relative block w-full px-3 py-3 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={user.username}
                onChange={handleInput}
              />
            </div>
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
                onChange={handleInput}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-3 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-3 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleInput}
              />
            </div>
            <div className="flex gap-20 text-lg justify-center pt-2">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => handleGenderChange("male")}
                  className="mx-2"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => handleGenderChange("female")}
                  className="mx-2"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-7 py-3 text-center me-2 mb-2 uppercase tracking-wide"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="flex justify-center text-md uppercase mt-2 font-semibold">
          <span>Don't have an account?</span>
          <Link to="/login" className="ml-2 ">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
