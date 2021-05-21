const http = require('http');
const express = require('express');
const fs = require('fs');
const { Console } = require('console');
const { response } = require('express');
const mongoose = require('mongoose')
const Joi = require('joi');
const Blog = require('./Database/User');
const ejs = require('ejs');
const path = require('path');


//mongoose db connection
const DBLink = 'mongodb+srv://Admin1:admin1234@test.orgiz.mongodb.net/WebApp?retryWrites=true&w=majority'
mongoose.connect(DBLink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))

//initializing express 
const app = express();

//set view engine to using ejs
app.set('view engine', 'ejs');

//depreciation message removal 
mongoose.set('useFindAndModify', false);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setting directory for css to be use with ejs
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

//home page, mainly to extract all the content
app.get('/', async (req, res) => {

    try {
        await Blog.find()
        .then((result) => {
            res.render('Body', { blogs: result })
        })
    } catch{
        res.status(404).send('404 Not Found')
    }
})

//interface for creating new post
app.get('/Newpost', async (req, res) => {
    try{
        res.render('NewPost')
    }catch{
        res.status(404).send('Page Not Found')
    }
    
})

//create new content
app.post('/CreateNewPost', async (req, res) => {

    try{
        const blogs = new Blog({

            Title: req.body.Title,
            Summary: req.body.Summary,
            Content: req.body.Content
    
        });
        await blogs.save()
        
    }catch{
        res.status(404).send('Error Occured')
        return;
    }

    (res.redirect('/'))
})

//delete a certain file
app.get("/deleteOne/:Title", async (req, res) => {

    try{
        await Blog.findByIdAndRemove(req.params.Title)
        .then((result) => {
            res.redirect('/')
        })
    }catch{
        res.status(404).send('Page Not Found')
    }
})

app.listen(8080, () => console.log('Listening on port 8080'))

