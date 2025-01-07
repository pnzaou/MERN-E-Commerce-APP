const { Router } = require("express")
const { registerUser } = require("../controllers/user.controller")
const userRouter = Router()

userRouter.post("/register", registerUser)

module.exports = userRouter