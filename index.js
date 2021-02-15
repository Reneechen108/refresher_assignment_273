//express module 
var express = require('express');
//express app
var app = express();

//view engine is set to ejs
app.set('view engine','ejs');

//setting the directory of views
app.set('views','./views');

//path of static directory
app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/user_home', (req, res) => {
    res.render('user_home');
});


app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/admin', (req, res) => {
    res.render('admin');
});

var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
