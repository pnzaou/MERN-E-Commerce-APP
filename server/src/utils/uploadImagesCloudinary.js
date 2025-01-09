const cloudinary = require("cloudinary").v2
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImagesCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())
    
    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({folder: "e_com_app"}, (err, uploadResult) => {
            if(err) {
                console.log(err);
            }
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadImage
}

module.exports = uploadImagesCloudinary