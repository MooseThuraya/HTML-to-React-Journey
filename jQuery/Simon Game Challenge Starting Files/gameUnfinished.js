$(document).ready(function () {

var count=0;
$.on("keydown", function(event){
    if((event.key).toLowerCase() === "a" && count ===0){
        nextSequence();
    }
    count++;
});

var gamePattern =[];
var userClickedPattern = [];


var buttonColors = ["red", "blue", "green","yellow"];
var randomChosenColor = buttonColors[nextSequence()]; 

gamePattern.push(randomChosenColor);

$("#"+randomChosenColor).on("click", function (){
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
});

    $(".btn").click(function () {

        //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
        var userChosenColour = $(this).attr("id");
        animatePress(userChosenColour);

        //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
        userClickedPattern.push(userChosenColour);

        //console.log(userClickedPattern);

    });

    userClickedPattern.push(userChosenColour);


switch(randomChosenColor){
    case "red": 
    if(userClickedPattern == randomChosenColor){
    var audio = new Audio('red.mp3');
        audio.play(); break;
    }else{
        var audio = new Audio('wrong.mp3');
        audio.play(); break;
    }

    case "blue": if (userClickedPattern== randomChosenColor) {
        var audio = new Audio('blue.mp3');
        audio.play(); break;
    } else {
        var audio = new Audio('wrong.mp3');
        audio.play(); break;
    }
    
    case "yellow": if (userClickedPattern== randomChosenColor) {
        var audio = new Audio('yellow.mp3');
        audio.play(); break;
    } else {
        var audio = new Audio('wrong.mp3');
        audio.play(); break;
    }   
     
    case "green": if (userClickedPattern== randomChosenColor) {
        var audio = new Audio('green.mp3');
        audio.play(); break;
    } else {
        var audio = new Audio('wrong.mp3');
        audio.play(); break;
    }
    default: alert("no sound cuz error");



}


function nextSequence(){
    var randomNumber = Math.random();
    randomNumber = randomNumber *4;
    randomNumber = Math.floor(randomNumber);
    return randomNumber;

}

function animatePress(currentColor){

    $("#"+currentColor).addClass(".pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

});

// -------------------------
// var buttonColours = ["red", "blue", "green", "yellow"];

// var gamePattern = [];

// function nextSequence() {

//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);

//   //1. Use jQuery to select the button with the same id as the randomChosenColour
//   //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

//   //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
//   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
//   audio.play();
// }


