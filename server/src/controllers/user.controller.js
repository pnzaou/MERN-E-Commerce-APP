const sendEmail = require("../config/sendEmail")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const verifyEmailTemplate = require("../utils/verifyEmailTemplate")
const generateAccessToken = require("../utils/generateAccessToken")
const generateRefreshToken = require("../utils/generateRefreshToken")
const uploadImagesCloudinary = require("../utils/uploadImagesCloudinary")

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

module.exports = {
    registerUser,
    verifyEmail,
    login,
    logout,
    uploadAvatar
}