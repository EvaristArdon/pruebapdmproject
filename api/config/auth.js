'use strict'
const jwt = require('jsonwebtoken');
const config = require('./properties');

module.exports = {
    auth: (req, res, next) => {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, config.KEY_TOKEN, { algorithms: config.JWT_ALG }, function (error, decoded) {
                if (error) {
                    res.status(403).send({ message: 'No se esta generando autorización válida...' });
                } else {
                    if (req.method != 'GET') {
                        if (decoded.role != 'admin') {
                            console.log(error); 
                            res.status(403).send({ error: 'solo admin puede realizar esa acción...' });
                        }
                        else {
                            next();
                        }
                    } else {
                        next();
                    }
                }
            });
        } else res.status(403).send({ message: 'No se esta ingresando autorización válida...' });
    },
    verify: (req, res, next) => {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, config.KEY_TOKEN, { algorithms: config.JWT_ALG }, function (error, decoded) {
                if (error) {
                    res.status(403).send({ message: 'No se esta generando autorización válida...' });
                } else {
                    next();
                }
            });
        } else res.status(403).send({ message: 'No se esta generando autorización válida...' });
    },
    validator: (req, res, next) => {
        const token = req.header('Authorize')

        if(!token){
            return res.redirect('/login').status(401).json({ error: true, message: "Acceso denegado" })
        }
        try {
            const verified = jwt.verify(token, process.env.KEY_TOKEN)
            req.user = verified
            next()
        }
        catch(err) {
            return res.redirect('/login').status(400).json({ error: true, message: "Invalid token" });
        }
    },
    localsession: (req, res, next) => {
        if (req.session.auth)
        return next();
      else
        return res.redirect('/login');
    },
}