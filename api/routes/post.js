const router = require("express").Router();
const { create, getSiblings,getPosts} = require("../controllers/post");
const Auth = require("../config/auth");

router.get("/current", getPosts);
router.post("/create", create);
router.get("/", getSiblings);

module.exports = router;
