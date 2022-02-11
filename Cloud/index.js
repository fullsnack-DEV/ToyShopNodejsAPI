//Setting the Config file for Cloudinary
//import
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dn1tkwy9f",
  api_key: "924759551863838",
  api_secret: "8lMki_BODwU9hU_oqtvz3kPveBU",
  secure: true,
});

module.exports = cloudinary;
