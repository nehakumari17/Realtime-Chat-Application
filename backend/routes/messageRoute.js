const router = require("express").Router()
const { sendMessage } = require("../controller/messageContoller")

router.route("/send/:id").post(sendMessage)

module.exports = router