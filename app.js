const express=require('express');
const path=require("path");
const fs=require("fs");
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
// var mongoURI = "mongodb://localhost:27017/contactdance";
// var MongoDB = mongoose.connect(mongoURI).connection;
// MongoDB.once('error', function(err) { console.log(err.message); });
// MongoDB.once('open', function() {
//   console.log("mongodb connection open");
// });

const app=express();
const port=80;


// define mongoose schema...
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String

  });

// schema compiled into model
const contact= mongoose.model('contact', contactSchema);




// express specific stuff
app.use('/static',express.static('static')); // for serving static files
app.use(express.urlencoded());

// pug secific stuff
app.set('view engine','pug');  // set the template engine aas pug
app.set('views',path.join(__dirname,'views'));  // set the views directory


// endpoints
//get requestss
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});

app.get('/about',(req,res)=>{
    res.status(200).render('about.pug');
});

app.get('/class',(req,res)=>{
    res.status(200).render('class.pug');
});

//post requestss

app.post('/contact',(req,res)=>{
    var myData =new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the Nikhil's database")
    }).catch(()=>{res.status(400).send("item was not saved to the database")})
});


// start the server
app.listen(port,()=>{
    console.log("the application started successfully on port 80");
});

