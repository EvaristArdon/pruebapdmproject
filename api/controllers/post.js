const Post = require('../models/post')
const postController = {};

postController.create = async (req, res) => {
    try {
        var newcar = new Post({
            title:req.body.title,
            price:req.body.price,
            description:req.body.description,
            images:req.body.images,
            brand:req.body.brand,
            model:req.body.model,
            year:req.body.year,
            ownerid:req.body.ownerid,
            tag:req.body.tag
        })
        await newcar.save()
        return res.status(201).json({ error: false, message: "Post Creado" })
    }
    catch(err) {
        return res.status(400).json(err)
    }
},

postController.getSiblings = async (req, res) => {
    try {
        var cars = await Post.find({ ownerid: req.user._id })

        return res.status(200).json({cars})
    }
    catch(err) {
        return res.status(400).json({err})
    }
}

postController.getPosts = async (req, res) => {
    try {
        var cars = await Post.find()

        return res.status(200).json({cars})
    }
    catch(err) {
        console.log(err)
        return res.status(400).json({err})
    }
}

module.exports = postController