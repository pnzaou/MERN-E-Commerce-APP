const mongoose = require("mongoose")

const cartProductSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : 'Product'
    },
    quantity : {
        type : Number,
        default : 1
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
})

const CartProduct = mongoose.model("CartProduct", cartProductSchema)

module.exports = CartProduct