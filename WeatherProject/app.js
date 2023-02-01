//jshint esversion:6
const express = require("express");
const https = require("https");//no need to install because it is native (pre-installed)
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true})); //this allows for receiving the inputed text for the user by parsing the "body" of the post request

app.get("/", function (req,res){//these req/res are what our server does (requesting/responding)

    //we want to send our index.html to the browser
      res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "38768d9c54b9abb449b54501372a5e25";
  const units = "metric";
  var url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey+"&units="+units;

    https.get(url, function(response){//the callback function will give us the response(Need HTTPS to get data)

      console.log(response.statusCode);//check the response to see if it worked

      response.on("data", function(data){//callback function will get the data that we should be getting

        //console.log(data);//will give us data in hexa-decimal
        const weatherData = JSON.parse(data);  //this will take in hexa-decimal or whatever string format to turn it into a JS object
            //console.log(weatherData);       //We can make it readable in JSON

        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The temperature in "+query+" is "+ temp+" degrees Celsius</h1>");//sending it back to the browser
        res.write("<p>The weather is currently "+weatherDescription+" in "+query+"</p>");
        res.write("<img src="+imageURL+">");
        res.send();//what we are telling our clients (we are using res)
        //We can only have one "send". we can't send more tha once. The header gets sent once.
        //res.send can be edited in HTML as well



        //we could go the other way and get an object and turn it into a string\
        const object = {
          name: "Moose",
          bestFood: "Sushi",
        };

        console.log(JSON.stringify(object));//now it is flat-packed to take minimum space but can be inflated to be in regular format later



      });

    });

});



app.listen(3000, function(){
  console.log("Server running on port 3000");
});
