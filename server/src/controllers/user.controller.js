const sendEmail = require("../config/sendEmail")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const verifyEmailTemplate = require("../utils/verifyEmailTemplate")

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

        const user = await User.find({email})

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

        const verifyEmailUrl = ""

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject: "Vérification de votre email",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })

        return res.status(201)
        
    } catch (error) {
        console.log("Erreur dans user.controller (registerUser)")
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}