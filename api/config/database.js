'use strict'
const mongoose = require('mongoose');
const mongo= require("./properties")

mongoose.connect(mongo.DB,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(db=>console.log("Servidor conectado"))
.catch(
    err=>console.error('Hay un error en la base de datos...',err));

module.exports = mongoose.connection