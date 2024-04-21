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

  const [gender, setGender] = useState("");

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
    console.log("New gender selected:", newGender);
    setUser({
        ...user,
        gender: newGender,
    });
    setGender(newGender);
};


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
    if(user.gender === null){
      toast.error("Gender is required..")
      isValid = false
    }

    if (!isValid) {
      return;
    }

    console.log("Form data before submission:", user);

    try {
      const response = await axios.post(registerRoute, user);
      if (response.status === 200) {

        setUser({
          name: "",
          email: "",
          password: "",
          gender: ""
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor:"#FAACA8",
      backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)"
      
      }}>
      <Toaster position="top-left" />
      <div className="p-8 rounded-lg max-w-md w-full border-2 border-black shadow-2xl">
        <div className="flex justify-center">
          <img src={logo} alt="chat app logo" className="w-20 h-auto mr-10 shadow-2xl rounded-full" />
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
                className="appearance-none relative block w-full px-3 py-3 my-2 border-2 border-black placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm"
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
                className="appearance-none relative block w-full px-3 py-3 my-2 border-2 border-black placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm"
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
                className="appearance-none relative block w-full px-3 py-3 my-2 border-2 border-black placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm"
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
                className="appearance-none relative block w-full px-3 py-3 my-2 border-2 border-black placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm"
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
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 uppercase tracking-wide"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="flex justify-center text-lg mt-2 font-semibold tracking-wide">
          <span>Already have an account?</span>
          <Link to="/login" className="ml-2 ">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
