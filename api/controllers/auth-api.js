const User = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("../config/properties");
const jwt = require("jsonwebtoken");
const authController = {};

authController.signin = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({ username: username })
    .then((username) => {
      if (!username)
        return res.status(404).send({ message: "usuario no existe" });
      bcrypt
        .compare(password, username.password)
        .then((match) => {
          if (match) {
            payload = {
              username: username.username,
              role: username.role,
            };
            jwt.sign(
              payload,
              config.KEY_TOKEN,
              { algorithm: config.JWT_ALG, expiresIn: config.JWT_EXP },
              function(error, token) {
                if (error) {
                  console.log(error);
                  res.status(400).send("no se genera autorización...");
                } else {
                  res.status(200).send({ message: "acceso correcto", token });
                }
              }
            );
          } else {
            res.status(400).send({ message: "acceso denegado" });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "usuario no existe" });
    });
};

authController.signup = async (req, res, next) => {
  let { username, email, id, phonenumber, image, password, role } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        return res.status(404).send({ message: "este usuario ya existe" });
      } else {
        if (image === undefined && role === undefined) {
          def_image = config.IMAGE_CLIENT;
          let newUser = new User({
            username: username,
            email: email,
            id: id,
            phonenumber: phonenumber,
            image: def_image.toString(),
            password: password,
            role: role,
          });
          return newUser.save();
        }
        if (image === undefined && role === "admin") {
          def_image = config.IMAGE_ADMIN;
          let newUser = new User({
            username: username,
            email: email,
            id: id,
            phonenumber: phonenumber,
            image: def_image.toString(),
            password: password,
            role: role,
          });
          return newUser.save();
        } else {
          let newUser = new User({
            username: username,
            email: email,
            id: id,
            phonenumber: phonenumber,
            image: image,
            password: password,
            role: role,
          });
          return newUser.save();
        }
      }
    })
    .then((newUser) => {
      res.json({ usuario: newUser });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Por favor revise sus datos" });
    });
};

authController.forgot = async (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.role === "client") {
          let update_user = {
            username: user.username,
            email: user.email,
            id: userid,
            phonenumber: user.phonenumber,
            image: user.image,
            password: password,
            role: user.role,
          };
          newUser = User.updateOne({ _id: user._id }, update_user);
          res.status(200).json({ message: "usuario actualizado con exito" });
        } else {
          return res.status(404).send({ message: "accion no permitida" });
        }
      } else {
        return res.status(404).send({ message: "este usuario no existe" });
      }
    })
    .then((newUser) => {
      res.json({ usuario: newUser });
    })
    .catch((err) => {
      res.status(500).json({ message: "Por favor revise sus datos" });
    });
};

module.exports = authController;
