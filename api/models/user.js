const mongoose = require ("mongoose");
const bcrypt = require('bcrypt');
const config = require('../config/properties')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type:String, required:true ,unique:true},
    email: {type:String, required:true ,unique:true},
    id: {type:String, required:true ,unique:true},
    phonenumber: {type:String, required:true ,unique:true},
    image:{type:String, required:true ,unique:true},
    password: {type:String, required:true},
    role: {type: String, default:'customer', enum: ['customer','admin']},
});

userSchema.pre('save',function(next){
    bcrypt.genSalt(parseInt(config.ROUNDS)).then(salts => {
        bcrypt.hash(this.password,salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

userSchema.pre('update', async function () {
    this._update.password = await bcrypt.hash(this._update.password, 10)
  })

module.exports = mongoose.model("user", userSchema);
