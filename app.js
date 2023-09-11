require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./database')
const path = require('node:path')
const {PostModel} = require('./src/models/Post');
const { router } = require('./src/routes/post.routes');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))

app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
    const notas = await PostModel.findAll()
    res.render('index', { title: "Pagina principal", notas:notas.reverse()})
})

app.get('/post', async (req, res)=>{
    res.render('post', {title:"crear POST"})
})

app.use('/posts', require('./src/routes/post.routes'))




app.listen(3000, () => {
    sequelize.sync({ force: false })
        .then(() => console.log("db in conneted"))
        .catch(err => console.log(err))
    console.log("Server conectado por puerto 3000") 
})