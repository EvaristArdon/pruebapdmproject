var express = require("express");
var router = express.Router();
const customerController = require("../controllers/user");
const setup = require("../config/auth");

router.get("/", setup.auth, customerController.index);
router.get("/:id", setup.auth, customerController.find);
router.post("/", customerController.create);
router.put("/:id", setup.auth, customerController.edit);
router.delete("/:id", setup.auth, customerController.delete);

module.exports = router;
