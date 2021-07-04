const User = require('../models/user');
const userController = {};
const jwt = require('jsonwebtoken')

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

const {
    validateLoginFacebook,
    validateId
  } = require('./User.validator')

UserController.loginGoogle = async (req, res, next) => {
      try {
        await validateLoginFacebook(req.body)
  
        const { username, email, imgUrl } = req.body
  
        const user = await User.find({ $or: [{ username }, { email }] })
  
        if (user.length > 1) next()
  
        if (user.length === 0) {
          const newUser = new User({
            username,
            email,
            imgUrl
          })
          newUser.url = `${process.env.BASE_URL}user/${newUser._id}`
  
          const {
            _id: id,
            username: newUsername,
            email: newEmail,
            imgUrl: newImgUrl
          } = await newUser.save()
  
          const token = jwt.sign(
            { id, newUsername, newEmail, newImgUrl },
            process.env.KEY_TOKEN,
            { expiresIn: '14d' }
          )
  
          return res.status(201).json({ error: false, accessToken: token }).end()
        }
  
        const {
          _id: id,
          username: registerUsername,
          email: registerEmail,
          imgUrl: registerImgUrl
        } = user
  
        const token = jwt.sign(
          { id, registerUsername, registerEmail, registerImgUrl },
          process.env.TOKEN_KEY,
          {
            expiresIn: '14d'
          }
        )
  
        return res.status(200).json({ error: false, accessToken: token }).end()
      } catch (error) {
        next(error)
      }
    },
    UserController.allUser = async (req, res, next) => {
      try {
        const users = await User.find()
          .populate('preferences', { name: 1 })
          .populate('favTutors', { username: 1 })
  
        const mappedUsers = users.map(
          ({
            _id: id,
            username,
            email,
            imgUrl
          }) => ({
            id,
            username,
            email,
            imgUrl
          })
        )
  
        return res.status(200).json({ error: false, results: mappedUsers }).end()
      } catch (error) {
        next(error)
      }
    }
module.exports = userController