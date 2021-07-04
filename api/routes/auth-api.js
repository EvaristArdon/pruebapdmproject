const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth-api");
const auth_google = require("../controllers/auth-google");
const config_auth = require("../config/auth");

router.post("/signin", auth.signin);
router.post("/signup", auth.signup);
router.post("/forgot", auth.forgot);
router.post("/google/signin", auth_google.signin);
router.get("/verifytoken", config_auth.verify, function(req, res) {
  return res.status(200).send({ status: "ok" });
});

module.exports = router;
