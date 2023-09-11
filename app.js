require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./database')
const path = require('node:path')
const {NoteModel} = require('./src/models/Notes')
require('./src/models/Post')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(express.static(__dirname + '/src/public'))
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
    const notas = await NoteModel.findAll()
    res.render('index', { title: "Pagina principal", notas:notas})
})

app.use('/notes', require('./src/routes/notes.routes'))

app.listen(3000, () => {
    sequelize.sync({ force: true })
        .then(() => console.log("db in conneted"))
        .catch(err => console.log(err))
    console.log("Server conectado por puerto 3000") 
})