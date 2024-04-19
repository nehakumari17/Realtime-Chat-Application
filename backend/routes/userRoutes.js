const router = require("express").Router()
const { register, login, setAvatar } = require("../controller/userController")

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/setAvatar/:gender/:id").get(setAvatar)

module.exports = router