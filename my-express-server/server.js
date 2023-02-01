//jshint esversion:6
const express = require("express");

const app = express(); //express always uses app, it's best practice.

//Parameters --> ((home-route),request,response)
//this is for http://localhost:3000
app.get("/", function(req, res){ //(location and what to do when it makes contact, callback what to do when contact is made)
//generally, specifies what should happen when the browser gets in touch with the server.
  //console.log(request);//will show info associated with server request
  //server isnt responing with anything

//so we do this instead.
//response.send("Hello");//the response is the display text of hello
res.send("<h1>Hello, World</h1>");

});

//Parameters --> ((contact-route),request,response)
//this is for http://localhost:3000/contact
app.get("/contact", function(req,res){

res.send("Contact me at: MOOSE@gmail");

});

//Parameters --> ((contact-route),request,response)
//this is for http://localhost:3000/about
app.get("/about", function(req,res){

res.send("My names is MOOSE and i'm a student");

});

app.get("/hobbies", function(req,res){

res.send("<ul><li>Games</li><li>Editing</li><li>Weights</li></ul>");

});

app.listen(3000, function (){
  console.log("Server started on port 3000");
});
//request that doesn't do anything yet
//The server isnt giving us anything to display.

//localserver: 3000 is like the root/homepage. like google.com
