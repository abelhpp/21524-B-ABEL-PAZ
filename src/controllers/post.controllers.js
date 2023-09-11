const {PostModel} = require('../models/Post')

const createPost = async(req, res) =>{
    const{title, content, imageLink } = req.body

    await PostModel.create({title, content, imageLink})
    res.redirect('/')
}

const listPost = async (req, res) => {
    const allNotes = await PostModel.findAll()
    res.json(allNotes)
}

module.exports = { createPost , listPost}