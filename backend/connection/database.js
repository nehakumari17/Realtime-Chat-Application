require("dotenv").config()
const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        if(!process.env.MONGODB_URL) {
            console.log("MONGODB_URL is not found..")
        }
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log("Error connecting to the database", error)
        process.exit(1)
    }
}

module.exports = connectDb