require("dotenv").config
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const { username, email, password, gender } = req.body;

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

        const newUser = new userModel({ username, email, password: hashPassword, gender });
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
        const userId = req.params.id;
        console.log('User ID from request params:', userId);
        if (!userId) {
            res.status(400).json({ error: 'User ID not found in request.' });
            return;
        }
        
        const avatarImage = req.body.image;
        if (!avatarImage) {
            res.status(400).json({ error: 'Avatar image not provided.' });
            return;
        }

        const userData = await userModel.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        if (!userData) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }
        res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (error) {
        console.error('Error in setAvatar:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};



module.exports = {
    register,
    login,
    setAvatar
}