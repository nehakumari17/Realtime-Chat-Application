import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import loader from "../assets/loader.gif";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoute";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const SetAvatar = () => {
  const navigate = useNavigate()
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
        console.log(decodedToken)
        console.log(gender)
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
            image: avatars[selectedAvatar]
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
    <div className="w-full h-screen" style={{backgroundImage: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)"}}>
        
      <Toaster position="top-left" />
      {isLoading ? (
        <div className="flex justify-center items-center w-screen h-screen bg-black">
          <img src={loader} alt="Loading" />
        </div>
      ) : (
        <div>
          <h1 className="flex justify-center font-bold text-3xl pt-28">
            Pick an avatar as your profile picture
          </h1>

          <div className="flex flex-col items-center mt-11">

            <div className="flex justify-center gap-4 mt-7">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvatar(index)}
                  style={{
                    margin: "1rem",
                    border:
                      selectedAvatar === index ? "2px solid blue" : "none",
                    borderRadius: "50%",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    key={avatar}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center mt-7">
            <button
              className=" bg-green-400 px-7 py-3 text-lg rounded-full hover:bg-green-500 font-semibold"
              onClick={setProfilePicture}
            >
              Set As Profile Picture
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetAvatar;
