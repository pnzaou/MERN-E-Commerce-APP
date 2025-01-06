const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Veuillez renseigner votre nom"]
    },
    email: {
        type: String,
        required: [true, "Veuillez renseigner votre email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Veuillez renseigner un mot de passe"]
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    refresh_token: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Actif", "Inactif", "Suspendu"],
        default: "Actif"
    },
    address_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        }
    ],
    shopping_cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CartProduct"
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: ""
    },
    roles: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User