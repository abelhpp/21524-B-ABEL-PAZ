const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database');

const PostModel = sequelize.define('post', {
  title: {
    type: DataTypes.STRING, // Tipo de dato para el título del post
    allowNull: false, // No se permite un título nulo
  },
  content: {
    type: DataTypes.TEXT, // Tipo de dato para el contenido del post
    allowNull: false, // No se permite contenido nulo
  },
  imageLink: {
    type: DataTypes.STRING, // Tipo de dato para el enlace de la imagen (URL)
    allowNull: false, // No se permite enlace nulo
  },
  createdAt: {
    type: DataTypes.DATE, // Tipo de dato para la fecha de creación
    allowNull: false, // No se permite fecha nula
    defaultValue: DataTypes.NOW, // Valor predeterminado: fecha actual
  },
});

module.exports = PostModel;
