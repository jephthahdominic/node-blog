const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')

const app = express();

// connect to mongodb
const DbURI = 'mongodb+srv://jephthah:fullstack$$@netuts.n6auirs.mongodb.net/?retryWrites=true&w=majority&appName=netuts';
mongoose.connect(DbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))


//register view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//middlewaare for static files
app.use(express.static('public'))

app.use(morgan('dev'));

app.get('/', (req,res)=>{
    const blogs = [
        {title: "The fastest man", snippet:"You cannot guess who the fastest man is"},
        {title: "The fastest typist", snippet: "You cannot guess who the fastest typist is"},
        {title:"The slowest thinker", snippet: "He thinks really slow but accurately"}
    ]
    res.render('index', {title: 'Home', blogs});
})
app.get('/about', (req,res)=>{
    res.render('about', {title: 'About'})
});
app.get('/blogs/create', (req,res)=> {
    res.render('create', {title: 'create a mew blog'})
})

//redirects

app.get('/about-us', (req,res)=>{
    res.redirect('/about')
});

//404 page

app.use((req,res)=>{
    res.status(404).render('404')
})