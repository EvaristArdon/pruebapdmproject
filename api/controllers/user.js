const User = require('../models/user');
const userController = {};

userController.index = async (req,res) => {
    let user = await User.find();
    return res.status(200).json(user);
}

userController.find = async (req, res, next)=> {
    let { id } = req.params;
    let user = await User.findOne({_id:id})
        .catch(err => { return next(res); });
    return res.status(200).json(user);
}

userController.create = async (req, res) => {
    let username = req.body.username;
    User.findOne({ username: username })
        .then(user => {
            if (user) {
                return res.status(404).send({ message: 'este usuario ya existe' })
            }
            else {
                let user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role:req.body.role,
                });
                return user.save();
            }
        })
        .then(user => {
            res.json({ usuario: user });
        })
        .catch(err => {
            res.status(500).json({ message: "Por favor revise sus datos" });
        })
}

userController.edit = async (req, res) => {
    let { id } = req.params;
    let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role:req.body.role,
    }
    try {
        await User.updateOne({ _id: id }, user);
        res.status(200).json({ "message": "usuario actualizado con exito" });
    }
    catch (err) {
        return res.status(500).json({ err: err, message: "Por favor revise sus datos ingresados" });
    }
}

userController.delete = async (req, res, next) => {
    let { id } = req.params;
    await User.removeOne({ _id: id });
    res.status(200).json({ "message": "usuario eliminado con exito" });
}

module.exports = userController;