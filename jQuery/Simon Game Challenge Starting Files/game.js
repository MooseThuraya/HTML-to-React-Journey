
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level =0;
var count = 0;
$("body").on("keydown", function (event) {

  if (count === 0) {
    nextSequence();
    $("h1").text("Level " +level);
    count++;
  }
  console.log("i exited the nextSequence()")
    $(".btn").click(function () {



      var userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);

      playSound(userChosenColour);

      animatePress(userChosenColour);

      if (userClickedPattern.length === gamePattern.length) {
          isCorrect();
      }

        
    });

  
});



  

function nextSequence() {
  level++;
  //alert("level is now "+ level);
  $("h1").text("Level " + level);

  for(var i = 0; i < level; i++){
    
    setTimeout(function () {
      alert('Entered timeOut');
     generateRandom();
    }, 1000);
                    
  }
  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function isCorrect() {


  var correctPatternTimes = 0;
  for (var i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] === userClickedPattern[i]) {
      correctPatternTimes++;
    }
  }
  if (correctPatternTimes === gamePattern.length) {
    nextSequence();
  }
  else {
    playSound("wrong");
    $("h1").text("Whoops, you lost,refresh to try again.")
    $("body").addClass("game-over");
    setTimeout(function () {
    $("body").removeClass("game-over");
    }, 300);
    
  }

}

function generateRandom(){
  alert("Making a new random number...");
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  alert("doing bottom stuff");
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
 
 
}

