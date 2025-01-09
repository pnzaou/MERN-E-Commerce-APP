const { Router } = require("express")
const { registerUser, verifyEmail, login, logout } = require("../controllers/user.controller")
const auth = require("../middlewares/auth.middleware")
const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/verify-email", verifyEmail)
userRouter.post("/login", login)
userRouter.get("/logout", auth, logout)

module.exports = userRouter