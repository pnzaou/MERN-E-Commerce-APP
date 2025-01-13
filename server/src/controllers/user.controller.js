const sendEmail = require("../config/sendEmail")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const verifyEmailTemplate = require("../utils/verifyEmailTemplate")
const generateAccessToken = require("../utils/generateAccessToken")
const generateRefreshToken = require("../utils/generateRefreshToken")
const uploadImagesCloudinary = require("../utils/uploadImagesCloudinary")
const generateOtp = require("../utils/generateOtp")
const forgotPasswordEmailTemplate = require("../utils/forgotPasswordEmailTemplate")

const registerUser = async (req, res) => {
    const {name, email, password} = req.body
    try {
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "Veuillez saisir votre nom, votre email et un mot de passe",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({ email })

        console.log(user)

        if(user) {
            return res.status(400).json({
                message: "Cet email existe déjà",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject: "Vérification de votre email",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })

        return res.status(201).json({
            message: "Inscription réussie",
            error: false,
            success: true,
            data: newUser
        })
        
    } catch (error) {
        console.log("Erreur dans user.controller (registerUser):", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findById(code)

        if(!user) {
            return res.status(400).json({
                message: "Code invalid",
                error: true,
                success: false
            })
        }

        if(user.verify_email) {
            return res.status(400).json({
                message: "Votre email à déjà été vérifié.",
                error: true,
                success: false
            })
        }
 
        const updated = await User.updateOne({_id: code, verify_email: false}, {
            $set: {verify_email: true}
        })

        return res.status(200).json({
            message: "Votre email a été vérifié avec succès.",
            error: false,
            success: true
        })

    } catch (error) {
        console.log("Erreur dans user.controller (verifyEmail):", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {

        if(!email || !password) {
            return res.status(400).json({
                message: "Tous les chamos sont obligatoires.",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect.",
                error: true,
                success: false
            })
        }

        if(user.status === "Suspendu") {
            return res.status(403).json({
                message: "Compte suspendu! Veuillez Contacter l'admin.",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect.",
                error: true,
                success: false
            })
        }

        const accessToken = generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie('accessToken', accessToken, cookieOptions)
        res.cookie('refreshToken', refreshToken, cookieOptions)

        return res.status(200).json({
            message: "Connexion réussie",
            erreor: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        console.log("Erreur dans user.controller (login):", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const logout = async (req, res) => {
    const userId = req.userId
    try {

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie("accessToken", cookieOptions)
        res.clearCookie("refreshToken", cookieOptions)

        const removeRefreshToken = await User.findByIdAndUpdate(userId, {
            $set: { refresh_token: "" }
        })

        return res.status(200).json({
            message: "Déconnexion réussie",
            erreor: false,
            success: true
        })

    } catch (error) {
        console.log("Erreur dans user.controller (logout):", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const uploadAvatar = async (req, res) => {
    const userId = req.userId
    const image = req.file
    try {
        const upload = await uploadImagesCloudinary(image)

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: { avatar: upload.url }
        })

        return res.status(200).json({
            message: "photo de profil modifiée avec succès.",
            data: upload.url
        })

    } catch (error) {
        console.log("Erreur dans user.controller (uploadAvatar):", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const updateUserDetails = async (req, res) => {
    const userId = req.userId
    const {name, email, mobile, password} = req.body 
    try {

        let hashedPassword = ""

        if(password) {
            const salt = await bcrypt.genSalt(10)
            hashedPassword = await bcrypt.hash(password, salt)
        }
        
        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...(name && {name: name}),
            ...(email && {email: email}),
            ...(mobile && {mobile: mobile}),
            ...(mobile && {mobile: mobile}),
            ...(password && {password: hashedPassword}),
        },{
            new: true
        })

        return res.status(200).json({
            message: "Modification réussie.",
            error: false,
            success: true,
            data: updatedUser
        })

    } catch (error) {
        console.log("Erreur dans user.controller (updateUserDetails):", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({
                message: "Aucun utilisateur enregistré avec cet email.",
                error: true,
                success: false
            })
        }

        const OTP = generateOtp()
        const expireTime = new Date() + 60 * 60 * 1000

        const update = await User.findByIdAndUpdate(user._id,{
            $set : {
                forgot_password_otp: OTP,
                forgot_password_expiry: new Date(expireTime).toISOString()
            }
        })

        await sendEmail({
            sendTo: email,
            subject: "Récupération de mot de passe",
            html: forgotPasswordEmailTemplate({
                name: user.name,
                otp: OTP
            })
        })

        return res.status(200).json({
            message: "Veuillez vérifier votre boite mail",
            error: false,
            success: true
        })

    } catch (error) {
        console.log("Erreur dans user.controller (forgotPassword):", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const verifyForgotPasswordOtp = async (req, res) => {
    const {email, otp} = req.body
    try {

        if(!email || !otp) {
            return res.status(400).json({
                message: "L'email et le code sont obligatoires.",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({
                message: "Aucun utilisateur enregistré avec cet email.",
                error: true,
                success: false
            })
        }

        const currenTime = new Date().toISOString()

        if(user.forgot_password_expiry < currenTime) {
            return res.status(400).json({
                message: "Ce code a expiré",
                error: true,
                success: false
            })
        }

        if(otp !== user.forgot_password_otp) {
            return res.status(400).json({
                message: "Ce code est invalid.",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "Code otp vérifié avec succès.",
            error: false,
            success: true
        })

    } catch (error) {
        console.log("Erreur dans user.controller (verifyForgotPasswordOtp):", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const resetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body
    try {
        
        if(!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires.",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({
                message: "Aucun utilisateur enregistré avec cet email.",
                error: true,
                success: false
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message: "Les deux mots de passe doivent être indentiques.",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        await User.findByIdAndUpdate(user._id, {
            $set: { password: hashedPassword }
        })

        return res.status(200).json({
            message: "Mot de passe modifié avec succès.",
            error: false,
            success: true
        })

    } catch (error) {
        console.log("Erreur dans user.controller (resetPassword):", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = {
    registerUser,
    verifyEmail,
    login,
    logout,
    uploadAvatar,
    updateUserDetails,
    forgotPassword,
    verifyForgotPasswordOtp,
    resetPassword
}