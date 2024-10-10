const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name:'dqczvxzoq' ,
    api_key: '969926655166495',
    api_secret: 'uiEdRSngL2HRT1ABhbzjA5mx9-Q'
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Dynamic folders', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const multer = require('multer')
const upload = multer({ storage })

module.exports = upload;