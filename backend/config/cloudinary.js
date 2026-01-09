const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dx5szhyyt',
  api_key: '377626258946722',
  api_secret: '0MZQkMOyLpr5seKQB8OZBONxC5c'
});

module.exports = cloudinary;
