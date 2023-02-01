//jshint esverion:6

const mongoose = require('mongoose'); //assert also, assert is always to do with testing

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useUnifiedTopology: true, useNewUrlParser: true}); //put in url that connects to mongoDB server, speciifes which DB

const fruitSchema = new mongoose.Schema ({//its like a constructor
  name: {
    type: String,
    required: [true, "Please check you data entry, no name specified!"] //or use "1"
  },
  rating: {
    type: Number,
    min:1,//also add validation, number stsys beteen certain numbers
    max:10
  },
  review: String
});//specify how data in our DB should be structured

const Fruit = mongoose.model("Fruit", fruitSchema); //make collection called fruits?, put in here as singular --> fruit, it does is by Lodash as seen before

const fruit = new Fruit ({ //now create fruit document
  name: "Apple",
  rating: 10,
  review: "Pretty solid as a fruit."
});

//fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});//specify how data in our DB should be structured

const Person = mongoose.model("Person", personSchema); //make collection called fruits?, put in here as singular --> fruit, it does is by Lodash as seen before

const mango = new Fruit({
  name: "Mango",
  rating: 9, //must be same name as specified in schema
  review: "Decent FRUIT"

});

mango.save();

const person = new Person ({ //now create fruit document
  name: "Amy",
  age: "12",
  favoriteFruit: mango

});
//person.save(); //to save a new person

Person.updateOne({name: "Amy"},{name:"John"}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated!");
  }
});

//
// Person.updateOne({name: "Amy"},{favoriteFruit:mango}, function(err){ //add mnago
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully updated!");
//   }
// });



//CREATING INSTANCES OF FRUIT

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!"
// });
// const orange = new Fruit({
//   name: "orange",
//   score: 4,
//   review: "The not best fruit!"
// })
// const banana = new Fruit({
//   name: "Banana",
//   score: 6,
//   review: "The kind of good fruit!"
// })

//INSERT THE SAME PATTERN OF DATA INTO OUR DB

//now we can tap into our model
// Fruit.insertMany([kiwi, orange, banana], function(err){ //call back to check for errors
//
//   if(err){
//     console.log(err);
//   }else{
//     console.log("successfully saved all the fruits to fruitsDB");
//   }
//
// });

// TO SEARCH THROUGH NODE.JS INSTEAD OF THE SHELL OF mongoDB

Fruit.find(function(err, fruits){ //fruits is an array of objects
  if(err){
    console.log(err);
  }else{

    //having known that there are no errors, we can close our connection
    mongoose.connection.close();//we can close the connection over here, because find has already been executed. We are left with the data.

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});


//UPDATING ONE

//
// //                      item that i want to update, What i want to update about it , call-back funtion
// Fruit.updateOne({_id: "5f031950239d0b0f50d50949"}, {name: "Peach"}, function(err){
//
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully updated the document");
//   }
//
// });

//DELETING ONE

// Fruit.deleteOne({_id: "5f031950239d0b0f50d50948"}, function(err){
//
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted");
//   }
//
// });

//DELETING MANY
// Person.deleteMany({name: "John"}, function(err){
//
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted");
//   }
//
// });
