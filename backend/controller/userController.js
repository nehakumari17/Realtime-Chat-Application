require("dotenv").config
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await userModel.findOne({ username });
        if (usernameCheck) {
            return res.status(400).send({ message: "User already exists with this username", success: false });
        }

        const emailcheck = await userModel.findOne({ email });
        if (emailcheck) {
            return res.status(400).send({ message: "User already exists with this email", success: false });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = new userModel({ username, email, password: hashPassword });
        await newUser.save();

        res.status(200).json({ message: "Sign up successful", success: true });
    } catch (error) {
        console.log("Error occurred during registration:", error);
        return res.status(400).send({ message: "Error occurred during registration", success: false });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "No user found. Please register yourself first." });
        }
        const isComparePassword = bcrypt.compareSync(password, user.password);
        if (!isComparePassword) {
            return res.status(400).json({ message: "Invalid login credentials", success: false });
        } else {
            const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(200).json({ message: "Login successful", success: true, token });
        }
    } catch (error) {
        console.error("Error occurred during login", error);
        return res.status(500).json({ message: "Error occurred during login", success: false });
    }
}

const setAvatar = async (req, res) => {
    try {
        const { gender, id } = req.params;
        
        // Construct the URL for fetching the avatar based on gender and id
        const avatarUrl = gender === 'male'
            ? `https://avatar.iran.liara.run/public/boy/${id}`
            : `https://avatar.iran.liara.run/public/girl/${id}`;
        
        // Fetch the avatar from the URL
        const response = await fetch(avatarUrl);

        // Check if the request was successful
        if (!response.ok) {
            if (response.status === 404) {
                // Return a 404 response if the avatar is not found
                return res.status(404).send('Avatar not found');
            } else {
                // Throw an error for other response statuses
                throw new Error(`Request failed with status ${response.status}`);
            }
        }

        // Convert response to array buffer and then to base64
        const buffer = await response.arrayBuffer();
        const imageData = Buffer.from(buffer).toString('base64');
        const base64Image = `data:image/jpeg;base64,${imageData}`;
        
        // Send the base64-encoded image as the response
        res.send({ avatar: base64Image });
    } catch (error) {
        console.error('Error fetching avatar:', error.message);
        // Return a 500 error response in case of any server-side error
        res.status(500).send('Internal Server Error');
    }
};




module.exports = {
    register,
    login,
    setAvatar
}