//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); //extended true allows us to post nested objects
//bodyparser allows us to go into routes and access req.body (an old version of HTTP request)


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");//__dirname is the file path of the current file is hosted in whichever other computer
});

//how to accept post requests?
app.post("/", function(req,res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 + num2;
  res.send("Your result is "+result);
});

app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res){
  var height = parseFloat(req.body.height);//it comes as a string, we must parse.
  var weight = parseFloat(req.body.weight);
  var result = weight/ (height*height);
  res.send("bmi is "+ result);
});

app.listen(3000, function(){//port can be any port 5000, or 330. 3000 most common for local developing
  console.log("Server has started on port 3000 ");

});
