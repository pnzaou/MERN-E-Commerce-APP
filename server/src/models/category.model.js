const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category