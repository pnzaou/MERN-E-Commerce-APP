const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const generatedRefreshToken = async (userId) => {
    const token = jwt.sign({ id: userId }, 
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: '7d' }
    )

    const updateRefreshTokenUser = await User.updateOne(
        {_id: userId},
        {
            refresh_token: token
        }
    )

    return token
}

module.exports = generatedRefreshToken