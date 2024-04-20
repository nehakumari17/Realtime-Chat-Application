const express = require("express")
const connectDb = require("./connection/database")
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoute")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

const PORT = 3000

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!!")
})

app.use("/api", userRoutes)
app.use("/api", messageRoutes)

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log("Error connecting to the database..", error)
        process.exit(1)
    })