const express = require("express");
const router = express.Router();
const multer = require("multer");
const { extname } = require("path");
const {TypesError} = require("../config/errors_types");
const { saveImage, deleteImage } = require("../controllers/file");

function fileFilter(req, file, cb, formats) {
  const ext = extname(file.originalname);

  if (!formats.includes(ext)) {
    return cb(new TypesError("file format not accepted", 400), null);
  }
  return cb(null, true);
}

const imageStorage = multer.memoryStorage();
const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    fileFilter(req, file, cb, [".jpg", ".png", ".webp", ".jpeg", ".gif"]);
  },
});

router.post("/image", imageUpload.single("image"), saveImage);
router.delete("/image/:id", deleteImage);

module.exports = router;
