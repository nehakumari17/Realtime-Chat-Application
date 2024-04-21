import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import loader from "../assets/loader.gif";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoute";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const SetAvatar = () => {
  const navigate = useNavigate();
  const maleApi = "https://avatar.iran.liara.run/public/boy";
  const femaleApi = "https://avatar.iran.liara.run/public/girl";

  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatars, setAvatars] = useState([]);

  const fetchAvatars = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const gender = decodedToken.gender;
      const apiUrl = gender === "male" ? maleApi : femaleApi;
      const promises = Array.from({ length: 4 }, async () => {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch avatar: ${response.statusText}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      });

      const newAvatars = await Promise.all(promises);
      setAvatars(newAvatars);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      toast.error("Error fetching avatars. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvatars();
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar.");
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token not found. Please log in again.");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return;
      }
      const { data } = await axios.post(`${setAvatarRoute}/${userId}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        toast.success("Profile picture set successfully!");
        navigate("/chat");
      } else {
        toast.error("Error setting avatar. Please try again.");
      }
    } catch (error) {
      console.error("Error setting profile picture:", error);
      toast.error("Failed to set profile picture. Please try again later.");
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center" style={{backgroundImage: "linear-gradient( 58.2deg,  rgba(40,91,212,0.73) -3%, rgba(171,53,163,0.45) 49.3%, rgba(255,204,112,0.37) 97.7% )"}}
    >
      <Toaster position="top-left" />
      {isLoading ? (
        <div className="flex justify-center items-center w-screen h-screen bg-black">
          <img src={loader} alt="Loading" />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-lg">
          <h1 className="font-bold text-3xl text-center">Pick an avatar as your profile picture</h1>

          <div className="flex flex-wrap justify-center gap-4 mt-7 w-full">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? "border-blue-500" : "border-transparent"} border-2 rounded-full p-1 cursor-pointer`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ width: "100px", height: "100px" }}
                  className="rounded-full"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>

          <button
            className="bg-green-400 px-7 py-3 mt-7 text-lg rounded-full hover:bg-green-500 font-semibold"
            onClick={setProfilePicture}
          >
            Set As Profile Picture
          </button>
        </div>
      )}
    </div>
  );
};

export default SetAvatar;
