require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./database')
const path = require('node:path')
const {PostModel} = require('./src/models/Post');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))

app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
    const data = await PostModel.findAll()
    res.render('index', { title: "Pagina principal", posts:data.reverse()})
})


app.get('/post', async (req, res)=>{
    res.render('post', {title:"crear POST"})
})

app.use('/posts', require('./src/routes/post.routes'))

app.get('/delete/:id', async(req,res)=>{
    const { id } = req.params;

    const post = await PostModel.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'El post no fue encontrado.' });
    }

    await post.destroy();

    res.redirect('/');
})

app.get('/edit/:id', async (req, res)=>{
    const { id } = req.params;
    const post = await PostModel.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'El post no fue encontrado.' });
    }
    res.render('edit', {title:"crear POST",post})
})

app.post('/update', async (req, res)=>{
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
})




app.listen(3000, () => {
    sequelize.sync({ force: false })
        .then(() => console.log("db in conneted"))
        .catch(err => console.log(err))
    console.log("Server conectado por puerto 3000") 
})