var ImageKit = require("imagekit");
require('dotenv').config();

var imageKitConfig = new ImageKit({
    publicKey : process.env.PUBLIC_KEY_IMAGE_KIT,
    privateKey : process.env.PRIVATE_KEY_IMAGE_KIT,
    urlEndpoint : process.env.URL_ENDPOINT_IMAGE_KIT
});

module.exports = imageKitConfig;