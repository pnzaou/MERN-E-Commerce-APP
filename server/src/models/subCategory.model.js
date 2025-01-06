const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Category"
        }
    ]
},{
    timestamps : true
})

const SubCategory = mongoose.model('SubCategory',subCategorySchema)

module.exports = SubCategory