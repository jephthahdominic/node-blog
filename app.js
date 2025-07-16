const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');

const app = express();

// connect to mongodb
const DbURI = 'mongodb+srv://jephthah:nodetuts11@netuts.n6auirs.mongodb.net/?retryWrites=true&w=majority&appName=netuts';
mongoose.connect(DbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))


//register view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//middleware for static files
app.use(express.static('public'));

// //middleware for accepting form data
app.use(express.urlencoded({extended: true}))
// app.use(express.urlencoded({extended: true}))

//logger middleware
app.use(morgan('dev'));

app.get('/', (req,res)=>{
    res.redirect('/blogs')
})
app.get('/about', (req,res)=>{
    res.render('about', {title: 'About'})
});
app.get('/blogs/create', (req,res)=> {
    res.render('create', {title: 'create a mew blog'})
})

// blog routes

//get all the blogs from the db

app.get('/blogs', (req,res)=>{
    Blog.find()
    .sort({createdAt: -1})
    .then(result => {
        res.render('index', {
            title: "All-blogs",
            blogs: result
        })
    })
})

app.post('/blogs', (req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then(()=>res.redirect('/blogs'))
    .catch(err => console.log(err))
})



app.get('/blogs/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', {blog: result, title: result.title})
    })
    .catch(err => console.log(err))
})

app.delete('/blogs/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => res.json({redirect: '/blogs'}))
    .catch(err => console.log(err))
})

//redirects

app.get('/about-us', (req,res)=>{
    res.redirect('/about')
});

//404 page

app.use((req,res)=>{
    res.status(404).render('404', {title: "404"})
})