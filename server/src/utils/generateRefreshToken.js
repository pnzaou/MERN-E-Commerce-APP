const jwt = require("jsonwebtoken")

const generatedRefreshToken = async (userId) => {
    const token = jwt.sign({ id: userId }, 
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: '7d' }
    )

    return token
}

module.exports = generatedRefreshToken