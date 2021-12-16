const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name : process.env.CLOUDINARRY_CLOUD_NAME,
    api_key : process.env.CLOUDINARRY_API_KEY,
    api_secret : process.env.CLOUDINARRY_API_SECRET,
});

module.exports = cloudinary;