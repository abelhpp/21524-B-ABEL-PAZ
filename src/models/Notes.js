const { DataTypes } = require('sequelize')
const {sequelize} = require('../../database')

const NoteModel = sequelize.define('notes',{
    content: DataTypes.TEXT,
    author: DataTypes.STRING
})

module.exports = {NoteModel}