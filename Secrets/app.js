//jshint esversion:6
require('dotenv').config(); //Put on-top, if u try to use envrionment variables and its not configured, u won't be able to access it.
//We have the .env file to help us render environment variables that we don't want showing to people if we post this on git hub
// Like the ecryption key.
//they are called config vars too?

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const bcrypt = require("bcrypt");
const saltRounds = 10; //the more increased the more the computer has to work to generate a hash
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose"); //password local doesnt need to be required. it is just a dependency for passport local mongoose.
const GoogleStrategy = require('passport-google-oauth20').Strategy;//will be used as a passport strategy.
const findOrCreate = require('mongoose-findOrCreate');// allows us tot tap into findOrCreate below...

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false //all in the documentation
})) ;

app.use(passport.initialize());//starts up passport to use it.
app.use(passport.session()); //here we use passport to manage our sessions.


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({//no longer an object, it is an object for the schema class
  email: String,
  password: String,
  googleId: String
});

//passport-local-mongoose is used here with a mongoose schema

userSchema.plugin(passportLocalMongoose); //we have schema to use passport as a plugin
userSchema.plugin(findOrCreate);


// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});//will encrypt the entire database, but we wanna encrpyt the password field only
// //encryptedFields to make it where only that field is encrypted. add more into array for more fields.
// // when you "save", it gets encrpyted
// // when you "find", it decrypt automatically
//

const User = new mongoose.model("User", userSchema);

//This is how you serialize for the local strategy
// passport.use(User.createStrategy());
//
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());//the order of the code for passport matters

//THIS SERIALIZATION IS FOR ALL STRATEGIES ,ALL authentications
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//Here we set-up and configure our new google strategy
passport.use(new GoogleStrategy({// we can't put above session or else it won't save the user log in sessions
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  //callback function is completed once user is redirected after google-sign in
  function(accessToken, refreshToken, profile, cb) {//profile for id, etc
    User.findOrCreate({ googleId: profile.id }, function (err, user) {//after setting up the back-end with findOrCreate, we have to set-up the front end
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res){
  res.render("home");
});

app.get("/auth/google",
      passport.authenticate("google", {scope: ["profile"]}) //not local. What we are saying is use passport to authenticate our user with the google strategy.
);                                                               //profile --> userID and email
//where you are redirected after you choooe your gmail
app.get("/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {//if ur authenticated go to sepecified route
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/secrets", function(req, res){ //log users in authenticated
  if(req.isAuthenticated()){
    res.render("secrets");
  }else{
    res.redirect("/login");
  }
});

// app.get("/submit", function(req, res){
//   if(req.isAuthenticated()){
//     res.render("submit");
//   }else{
//     res.redirect("/login");
//   }
// });

app.get("/logout", function(req, res){
  req.logout();//end user;s session
  res.redirect("/");
});

app.post("/register", function(req, res){
//register is from the passport package
  User.register({username: req.body.username}, req.body.password, function(err, user){//error or new registered user
    if(err){
      console.log(err);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req, res, function(){//this callback is triggered if authentication is succcessful
        res.redirect("/secrets");//if logged in, then authentication is automatic if in the same session
    });
    }

  });
});

app.post("/login", function(req, res){

const user = new User({
  username: req.body.username,
  password: req.body.password
});

req.login(user, function(err){

  if(err){
    console.log(err);
  }else{
    passport.authenticate("local")(req, res, function(){//succcessfully logged in
      res.redirect("/secrets");
  });
}
});



});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
