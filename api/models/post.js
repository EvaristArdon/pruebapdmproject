const mongoose = require ("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    title:{type:String, required:true},
    price:{type:String, required:true},
    description: {type:String, required:true},
    images:{ type: JSON,required: true },
    brand:{type:String, require: true},
    model:{type:String, required:true},
    year:{type:String, require:true},
    ownerid:{type: String, required: true},
    tag:{type: String, required: true, default:'en venta', enum: ['en venta', 'vendido']}
});

module.exports = mongoose.model("post", postSchema)