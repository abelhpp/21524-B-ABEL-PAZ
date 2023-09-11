const { PostModel } = require('../models/Post');

// Crear un nuevo post
const createPost = async (req, res) => {
  const { title, content, imageLink } = req.body;
  await PostModel.create({ title, content, imageLink });
  res.redirect('/');
};

// Listar todos los posts
const listPost = async (req, res) => {
  const allPosts = await PostModel.findAll();
  res.json(allPosts);
  res.redirect('/', {posts:allPosts});
};

// Editar un post por su ID
const editPost = async (req, res) => {
  const { id, title, content, imageLink } = req.body;

  // Buscar el post por su ID
  const post = await PostModel.findByPk(id);


  // Actualizar los campos del post
  post.title = title;
  post.content = content;
  post.imageLink = imageLink;

  // Guardar los cambios
  await post.save();

  res.redirect('/');
};

// Eliminar un post por su ID
const deletePost = async (req, res) => {
    const { id } = req.params;

    const post = await PostModel.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'El post no fue encontrado.' });
    }

    await post.destroy();

    res.redirect('/');
};

module.exports = { createPost, listPost, editPost, deletePost };
