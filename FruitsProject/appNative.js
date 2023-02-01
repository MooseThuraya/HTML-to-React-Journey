//jshint esverion:6

const MongoClient = require('mongodb').MongoClient;//we aquire package
const assert = require('assert'); //assert also, assert is always to do with testing

// Connection URL
const url = 'mongodb://localhost:27017'; //when working on mongoDb, it is always the same port for mongoDb to connect to it.
//base url to connect to our Database

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true } ); //it will connnect to our mongoDB and if our fruitsDB doesn't exist, it will create it.

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);//validates data entry and our connection to mongoDb Database
  //makes sure there are no errors.

  console.log("Connected successfully to server");

  const db = client.db(dbName);

  findDocuments(db, function(){
  client.close();//Only once inserting the docs is done do we close the connection to the Database.
});

});

const insertDocuments = function(db, callback){
  //get the documents collection
  const collection = db.collection('fruits');

//Insert some documents
  collection.insertMany([
    { //individual record or document
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda Sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff!"
    }
  ], function(err, result){
    assert.equal(err, null);//validates that there were no erros while inserting
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback){

  const collection = db.collection('fruits');

  collection.find({}).toArray(function(err, fruits){
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });


}
