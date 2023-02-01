//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology:true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

/////////////////////////////////////////REQUEST HANDLING ALL ARTICLES////////////////////

//We refactored our code so we have a single route, its a better practice.
app.route("/articles")

.get(function(req, res){

  Article.find(function(err, foundArticles){//searches all articles cuz there is no condition.
    if(!err){
      res.send(foundArticles);
    }else{
      res.send(err);
    }

  });

})

.post(function(req, res){ //POST requests should go to the collection of resources than a specific resource
  console.log(req.body.title);
  console.log(req.body.content);

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if(!err){
      res.send("Successfully added an Article");
    }else{
      res.send(err);
    }
  });

})

.delete(function(req, res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all Articles");
    }else{
      res.send(err);
    }
  })
});
/////////////////////////////////////////REQUEST HANDLING SPECIFIC ARTICLES////////////////////

app.route("/articles/:articleTitle")

//req.params.articleTitle

.get(function(req, res){

  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){//we are expecting one article to return
      if(foundArticle){//if we have an article that was found matching the title we suggested
        res.send(foundArticle);
      }else{
        res.send("No articles mathching that title was found.");
      }
  });
})

.put(function(req, res){

//mongoose doesn't allow overwriting, so we need to explicitly overwrite.
  Article.updateOne( //.update() is deprecated
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      }
    }
  );
})

.patch(function(req, res){
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body}, //let the client choose parameters to request for by having it as req.body
    function(err){
      if(!err){
        res.send("Successfully updated the article");
      }else{
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if(!err){
        res.send("Successfully deleted the corresponding article");
      }else{
        res.send(err);
      }
    }
  );
});

//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
