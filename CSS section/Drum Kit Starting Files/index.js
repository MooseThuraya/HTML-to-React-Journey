
// document.querySelector("button").addEventListener("click", handleClick); //(type, )
// //if we use parenthesis then the function will be called as soon as the line is read.
// //in this case we only want this function if clicked.

// function handleClick(){
    
// }

//this is another form
//if we want to use querySelectorAll, we must use the index [0]





// Detecting button press
var numberOfDrumButtons = document.querySelectorAll(".drum").length; 
var keyInput;

for(var i = 0; i < numberOfDrumButtons ; i++ ){


    document.querySelectorAll(".drum")[i].addEventListener("click", function(){
    //"this" indentifies what clicked, u identify the the first part of the parameter .addEventListener()
    //this.style.color = "white"; //we already have the indentity so we dont need to query.
    var buttonInnerHTML = this.textContent; //or innerHTML

    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
    
    });


    //detecting if key was pressed    
    //"event" allows us to know which key was pressed.
    document.addEventListener("keydown", function(event){
        makeSound(event.key);//key property of the event
        buttonAnimation(event.key);
    });


    
function makeSound(key){
    switch (key) {
        case "w": var tom1 = new Audio('sounds/tom-1.mp3');
            tom1.play();
            break;
        case "a": var tom2 = new Audio('sounds/tom-2.mp3');
            tom2.play();
            break;
        case "s": var tom3 = new Audio('sounds/tom-3.mp3');
            tom3.play();
            break;
        case "d": var tom4 = new Audio('sounds/tom-4.mp3');
            tom4.play();
            break;
        case "j": var snare = new Audio('sounds/snare.mp3');
            snare.play();
            break;
        case "k": var kickBass = new Audio('sounds/kick-bass.mp3');
            kickBass.play();
            break;
        case "l": var crash = new Audio('sounds/crash.mp3');
            crash.play();
            break;
        default: console.log("buttonInnerHTML");
    }

}

}

function buttonAnimation(currentKey){
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed"); //without "."
    setTimeout( function(){
        activeButton.classList.remove("pressed");
    },100);
}




