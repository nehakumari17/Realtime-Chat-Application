const router = require("express").Router()
const { sendMessage } = require("../controller/messageContoller")
const isAuthenticated = require("../middleware/authMiddleware")

router.route("/send/:id").post(isAuthenticated, sendMessage)

module.exports = router