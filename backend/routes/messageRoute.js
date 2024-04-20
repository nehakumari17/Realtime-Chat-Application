const router = require("express").Router()
const { sendMessage, getMessage } = require("../controller/messageContoller")
const isAuthenticated = require("../middleware/authMiddleware")

router.route("/send/:id").post(isAuthenticated, sendMessage)

router.route("/:id").get(isAuthenticated, getMessage)

module.exports = router