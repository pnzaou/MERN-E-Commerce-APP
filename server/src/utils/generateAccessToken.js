const jwt = require("jsonwebtoken")

const generatedAccessToken = (userId) => {
    const token = jwt.sign({ id: userId }, 
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: '5h' }
    )

    return token
}

module.exports = generatedAccessToken