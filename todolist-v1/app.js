//jshint esversion:6

//app.js is our server

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname+"/date.js");
const _ = require("lodash");




//console.log(date());//if i want it to run, put parenthesis
const app = express();

//const items = ["Buy Food", "Cook Food", "Eat Food"];//we can make it constant because pushing is allowed for constant but a new intialization isn't.
//const workItems=[];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine","ejs");//view engine will look for the views folder by default

mongoose.connect("mongodb+srv://test123:test123@cluster0.rtwtq.mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});//step 1

// const itemSchema = new mongoose.Schema ({
//   name: String
// });

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});
const item2 = new Item({
  name: "Add with +"
});
const item3 = new Item({
  name: "<-- Hit to delete"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items:[itemSchema]
};

const List = new mongoose.model("List", listSchema);//singular


// Item.find(function(err, items){
//    if(err){
//      console.log(err);
//    }else{
//      items.forEach(function(item){
//        console.log(item);
//      });
//    }
// });

app.get("/", function(req, res){
  //we will write some logic code to see if it is the weekend

/*
if(currentDay === 6  || currentDay === 0){// saturday or sunday
  day = "Weekend";
  //res.send("<h1>Yaaay it's a weekend</h1>");//res.send is the last writing method
}else{
  day="Weekday";
  //res.write("<p>It is not the weekend</p>");//res.write allows you to write more than once
  //res.write("<h1>WE HAAAVE WORK</h1>");
  //instead of writing all of this, we can just send an HTML file
}
*/
/*switch(currentDay.toString()){
  case'0': day = "Sunday";
  break;
  case'1': day = "Monday";
  break;
  case'2': day = "Tuesday";
  break;
  case'3': day = "Wednesday";
  break;
  case'4': day = "Thursday";
  break;
  case'5': day = "Friday";
  break;
  case'6': day = "Saturday";
  break;
  default: day = "Error"
}*/

  //const day = date.getDate();//from date.js
  Item.find({}, function(err, foundItems){//foundItems is an array,it gives an array as a result
    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }else{
            console.log("Successfully saved all the defaultItems to todolistDB");
        }
        res.redirect("/");

      });
    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});//will go to views and look for list inside it.
    }


  });


});

app.post("/", function(req,res){

  // if(req.body.list === "Work List"){
  //   let item = req.body.newItem;
  //   workItems.push(item);
  //   res.redirect("/work");
  //
  // }else{
  //   let item = req.body.newItem;
  //   items.push(item);
  //   res.redirect("/");
  // }
const itemName = req.body.newItem;
const listName = req.body.list; //which we got from the button name, tapping into the button name gives us its value.

const item = new Item({
  name: itemName
});

if(listName === "Today"){
  item.save();
  res.redirect("/");
}else{
  List.findOne({name: listName}, function(err, foundList){
    if(err){
      console.log(err);
    }else{
    foundList.items.push(item);
    foundList.save();
    res.redirect("/"+listName);
  }
  });
}

//THIS IS NOT A FUNCTION
// Item.insertOne(item, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully added the item");
//   }
// });


});


app.post("/delete", function(req,res){
  const checkItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkItemId, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Successfully deleted the item");
        res.redirect("/");
      }
    });
  }else{
    List.findOneAndUpdate({name: listName},{$pull: {items:{_id: checkItemId}}}, function(err, foundList){
      if(err){
        console.log(err);
      }else{
        res.redirect("/"+listName);
      }
    }); //after pull, its an array which we have as "items"
  }


});

app.get("/:paramName", function(req,res){
  const customListName = _.capitalize(req.params.paramName);

  List.findOne({name: customListName}, function(err, foundList){ //this gives an object back, it returns the document if found
    if(!err){

      if(!foundList){
          //console.log("Doesn't Exist!");
          //create a new list
          const list = new List({
            name: customListName,
            items: defaultItems //defaultItems is already an array, so don't put brackets around it
          });
          list.save();
          res.redirect("/"+customListName);

      }else{
        //console.log("Exists!")
        //show an existing list
          res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }

    }
  });


});

// app.get("/work", function(req, res){
//
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
//
// });

app.post("/work", function(req,res){

const item = req.body.newItem;
workItems.push(item);
res.redirect("/work");

});

app.get("/about", function(req, res){
  res.render("about");
});

//to run locally and on the web
let port = process.env.PORT; //let heroku choose the port
if (port == null || port == "") { // if null or empty string
  port = 3000; //then use our local one
}

app.listen(port, function(){
  console.log("Server started successfully!");
});
