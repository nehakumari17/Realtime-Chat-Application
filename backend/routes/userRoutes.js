const router = require("express").Router()
const { register, login, setAvatar, getOtherUsers } = require("../controller/userController")
const isAuthenticated = require("../middleware/authMiddleware")

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/setAvatar/:id").post(setAvatar)

router.route("/getOtherUsers").get(isAuthenticated, getOtherUsers)

module.exports = router