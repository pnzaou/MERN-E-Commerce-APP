const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const token = req.cookies.accessToken

        if(!token) {
            return res.status(401).json({
                message: "Veuillez fournir un token",
                error: true,
                success: false
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
        if(!decode) {
            return res.status(401).json({
                message: "Token invalid",
                error: true,
                success: false
            })
        }
        
        req.userId = decode.id 
        
        next()

    } catch (error) {
        console.log("Erreur dans auth.middleware :", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = auth