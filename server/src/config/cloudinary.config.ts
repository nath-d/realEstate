const config = require('../../config');

export const cloudinaryConfig = {
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
}; 