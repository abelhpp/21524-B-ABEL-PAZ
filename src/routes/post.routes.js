const { Router } = require('express');
const { createPost, listPost, editPost, deletePost } = require('../controllers/post.controllers');

const router = Router();

// Ruta para crear un nuevo post
router.post('/', createPost);

// Ruta para listar todos los posts
router.get('/', listPost);

// Ruta para editar un post por su ID
router.put('/', editPost);

// Ruta para eliminar un post por su ID
router.delete('/', deletePost);

module.exports = router;
