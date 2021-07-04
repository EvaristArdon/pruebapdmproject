const files= require("../config/properties")
var ImageKit = require("imagekit");

module.exports = new ImageKit({
  publicKey: files.PUBLIC_KEY,
  privateKey: files.PRIVATE_KEY,
  urlEndpoint: files.URL_ENDPOINT,
});
