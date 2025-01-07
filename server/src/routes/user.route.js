const { Router } = require("express")
const { registerUser, verifyEmail } = require("../controllers/user.controller")
const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/verify-email", verifyEmail)

module.exports = userRouter