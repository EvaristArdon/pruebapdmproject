const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Auth = require("../config/auth");

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.get("/forgot-pass", (req, res) => {
  res.render("pages/forgot-pass");
});

router.get("/reset-pass", (req, res) => {
  res.render("pages/reset-pass");
});

router.get("/error", (req, res) => {
  res.render("pages/user-error");
});

router.get("/not-found", (req, res) => {
  res.render("pages/404");
});

router.get("/", Auth.localsession, (req, res) => {
  res.redirect("/dashboard");
});

router.get("/dashboard", Auth.localsession, (req, res) => {
  let role = req.session.auth.role
  if (role == "admin") {
    res.render("pages/admin/dashboard");
  } else {
    res.render("pages/client/dashboard");
  }
});

router.get("/profile", Auth.localsession, async (req, res) => {
  res.render("pages/profile");
});

router.get("/users", Auth.localsession, async (req, res) => {
  let users = await User.find();
  let role = req.session.auth.role
  if (role == "admin") {
    res.render("pages/admin/users", { users });
  } else {
    res.render("pages/client/users", { users });
  }
});

router.get("/posts", Auth.localsession, async (req, res) => {
  let posts = await Post.find();
  let role = req.session.auth.role
  if (role == "admin") {
    res.render("pages/admin/posts", {posts});
  } else {
    res.render("pages/client/posts", {posts});
  }
});

module.exports = router;
