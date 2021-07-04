const User = require("../models/user");
const config = require("../config/properties");
const authController = {};

authController.signin = (req, res) => {
    let token_google = req.body.token;
    User.findOne({ email: email })
        .then((user) => {
            if (user) {
                user.then((match) => {
                    if (match) {
                        payload = {
                            username: user.username,
                            email: user.email
                        };
                            jwt.sign(
                                payload,
                                config.KEY_TOKEN,
                                { algorithm: config.JWT_ALG, expiresIn: config.JWT_EXP },
                                function (error, token) {
                                    if (error) {
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
            } else {
                let newUser = new User({
                    username: token.email,
                    email: token.email,
                    password: token.password,
                    role: role,
                });
                return newUser.save();
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
