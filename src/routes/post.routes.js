const { Router } = require('express')
const { createPost, listPost} = require('../controllers/post.controllers')

const router = Router()

router.post('/', createPost)
router.get('/', listPost)

module.exports = router 