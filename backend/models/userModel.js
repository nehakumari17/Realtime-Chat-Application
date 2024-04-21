const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 30
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 12
    },
    gender: {
        type: String,
        required: true,
        default: "not specified"
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    }
})

module.exports = mongoose.model("User", userSchema)