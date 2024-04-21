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
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "No user found. Please register yourself first." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            await user.save();
            return res.status(400).json({ message: "Invalid login credentials." });
        } else {
            user.failedLoginAttempts = 0;
            await user.save();

            const token = JWT.sign({ id: user._id, gender: user.gender, isAvatarImageSet: user.isAvatarImageSet }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });
            return res.status(200).json({
                message: "Login successful",
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    gender: user.gender,
                    isAvatarImageSet: user.isAvatarImageSet
                },
                token
            });
        }
    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ message: "Error occurred during login.", success: false });
    }
};


const setAvatar = async (req, res) => {
    try {
        const userId = req.params.id;
        const {gender} = req.body
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
                gender,
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

const getOtherUsers = async (req, res) => {
    try {
        const logInUserId = req.id
        const otherUsers = await userModel.find({_id: {$ne: logInUserId}}).select("-password")
        return res.status(200).send(otherUsers)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Error in showing all other users.."})
    }
}


module.exports = {
    register,
    login,
    setAvatar,
    getOtherUsers
}