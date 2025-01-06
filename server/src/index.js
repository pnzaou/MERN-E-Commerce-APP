const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const helmet = require("helmet")
const connexion = require("./config/connectDB")

dotenv.config()

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT

app.get("/", (req, res) => {
    res.json({})
})

connexion().then(() =>{
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
})