const User = require('../models/user');
const bcrypt = require('bcrypt');
const authController = {};

authController.login = (req,res) => {
    let {username,password} = req.body
    User.findOne({username})
        .then(username => {
            if(!username) return res.redirect('/error')
                bcrypt.compare(password,username.password)
                  .then(match => {
                        if(match){
                            payload = {
                                username: username.username,
                                email: username.email,
                                image: username.image,
                                role: username.role
                            }
                            req.session.auth=  payload;
                            res.redirect('/dashboard')
                        }else{
                            res.redirect('/error')
                            res.status(400).send({message: 'Acceso denegado, revise su password'});
                        }
                  }).catch(error => {
                    res.redirect('/error')
                    res.status(400).send({error});
                  });
        }).catch(error => {
            res.redirect('/error')
            console.log(error)
            res.status(404).send({message: 'Usuario no existe'});
        });
}
authController.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/login')
}

authController.register = (req,res) => {
    let {username,email,phonenumber,id,password} = req.body
    User.findOne({username:username,email:email})
        .then(user => {
            if(user) {
                res.redirect('/error')
                return res.status(404).send({message: 'Usuario ya existe'});
            }
            else {
                let newUser = new User({
                    username: username,
                    email: email,
                    password: password,
                    role: role
                });
                req.session.auth=  newUser;
                res.redirect('/dashboard')
                return newUser.save();
            }
        }).catch(error => {
            res.redirect('/error')
            res.status(404).send({message: 'Error al guardar usuario, revise sus datos'});
        });
}

module.exports = authController;