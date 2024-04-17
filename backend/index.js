const express = require("express")
const connectDb = require("./connection/database")
const app = express()

const PORT = 3000

app.get("/", (req, res) => {
    res.send("Hello World!!")
})

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