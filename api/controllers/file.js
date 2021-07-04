const imagekit = require("../config/files");

async function saveImage(req, res) {
  try {
    const image = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "BuyCarApp",
    });
    res.status(200).send({ id: image.fileId, url: image.url });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function deleteImage(req, res) {
  try {
    await imagekit.deleteFile(req.params.id);
    res.status(200).send({ status: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = { saveImage, deleteImage };