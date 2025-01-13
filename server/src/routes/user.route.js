const { Router } = require("express")
const { registerUser, verifyEmail, login, logout, uploadAvatar, updateUserDetails, forgotPassword, verifyForgotPasswordOtp, resetPassword } = require("../controllers/user.controller")
const auth = require("../middlewares/auth.middleware")
const upload = require("../middlewares/multer")
const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/verify-email", verifyEmail)
userRouter.post("/login", login)
userRouter.get("/logout", auth, logout)
userRouter.put("/upload-avatar", auth, upload.single('avatar'), uploadAvatar)
userRouter.put("/update-user", auth, updateUserDetails)
userRouter.put("/forgot-password", forgotPassword)
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtp)
userRouter.put("/reset-password", resetPassword)

module.exports = userRouter