import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import loader from "../assets/loader.gif";

const SetAvatar = () => {
    const api = "https://avatar-placeholder.iran.liara.run";

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [gender, setGender] = useState("male"); // Default gender

    // Fetch data function to fetch gender-specific avatars
    const fetchData = async () => {
      try {
          console.log("Fetching avatars...");
          const data = [];
          const avatarRange = 500; // Limit the range of avatar IDs
  
          for (let i = 0; i < 4; i++) {
              const avatarId = Math.floor(Math.random() * avatarRange);
              const avatarUrl = `${api}/${gender}/${avatarId}`;
              console.log(`Requesting avatar with ID: ${avatarId} at URL: ${avatarUrl}`);
  
              const response = await fetch(avatarUrl);
  
              // Check if the request was successful
              if (!response.ok) {
                  console.error(`Failed to fetch avatar with ID ${avatarId}, status: ${response.status}`);
                  if (response.status === 404) {
                      data.push(null); // Handle 404 Not Found error
                  } else {
                      throw new Error(`Request failed with status ${response.status}`);
                  }
              } else {
                  // Convert response to base64
                  const buffer = await response.arrayBuffer();
                  const base64Image = Buffer.from(buffer).toString("base64");
                  data.push(base64Image);
              }
          }
  
          console.log("Avatars fetched successfully:", data);
          setAvatars(data);
          setIsLoading(false);
      } catch (error) {
          console.error("Error fetching avatars:", error.message);
          toast.error("Error fetching avatars. Please try again later.");
          setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchData()
  })
  

    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
        setSelectedAvatar(undefined);
    };

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center w-screen h-screen bg-black">
                    <img src={loader} alt="Loading" />
                </div>
            ) : (
                <div>
                    <h1 className="flex justify-center font-bold text-3xl mt-28">
                        Pick an avatar as your profile picture
                    </h1>

                    <div className="flex flex-row justify-center items-center mt-11">
                        {/* Gender selection buttons */}
                        <div style={{ display: "flex", gap: "10px" }}>
                            <div>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={gender === "male"}
                                    onChange={() => handleGenderChange("male")}
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
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>

                        {/* Display avatars */}
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                                style={{
                                    margin: "1rem",
                                    border: selectedAvatar === index ? "2px solid blue" : "none",
                                    borderRadius: "50%",
                                    padding: "5px",
                                }}
                            >
                                {avatar ? (
                                    <img
                                        src={`data:image/jpeg;base64,${avatar}`}
                                        alt="avatar"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                ) : (
                                    <div style={{ width: "100px", height: "100px", backgroundColor: "#ccc" }}>
                                        No Image
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Notifications */}
            <Toaster />
        </div>
    );
};

export default SetAvatar;
