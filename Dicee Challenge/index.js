var randomNumber1 = Math.random();
randomNumber1 = randomNumber1 * 7; //it will never reach 7 (6.999-max)
randomNumber1 = Math.floor(randomNumber1);//it will floor so the max is 6 and it's clean

switch (randomNumber1) {
    case 1:
        // element.setAttribute(attributename, attributevalue)
        document.querySelector(".img1").setAttribute("src", "images/dice1.png"); 
        break;
    case 2:
        document.querySelector(".img1").setAttribute("src", "images/dice2.png");
        break;
    case 3:
        document.querySelector(".img1").setAttribute("src", "images/dice3.png");  
        break;
    case 4:
        document.querySelector(".img1").setAttribute("src", "images/dice4.png");  
        break;
    case 5:
        document.querySelector(".img1").setAttribute("src", "images/dice5.png");  
        break;
    case 6:
        document.querySelector(".img1").setAttribute("src", "images/dice6.png");  
        break;                    
    // default:
    // default code block
}

var randomNumber2 = Math.random();
randomNumber2 = randomNumber2 * 7; //it will never reach 7 (6.999-max)
randomNumber2 = Math.floor(randomNumber2);//it will floor so the max is 6 and it's clean

switch (randomNumber2) {
    case 1:
        // element.setAttribute(attributename, attributevalue)
        document.querySelector(".img2").setAttribute("src", "images/dice1.png");
        break;
    case 2:
        document.querySelector(".img2").setAttribute("src", "images/dice2.png");
        break;
    case 3:
        document.querySelector(".img2").setAttribute("src", "images/dice3.png");
        break;
    case 4:
        document.querySelector(".img2").setAttribute("src", "images/dice4.png");
        break;
    case 5:
        document.querySelector(".img2").setAttribute("src", "images/dice5.png");
        break;
    case 6:
        document.querySelector(".img2").setAttribute("src", "images/dice6.png");
        break;
    // default:
    // default code block
}

if(randomNumber1>randomNumber2){
    document.querySelector("h1").innerText = "🚩Player 1 WINS!";
}
else if(randomNumber1<randomNumber2){
    document.querySelector("h1").innerText = "Player 2  WINS!🚩";
}
else{
    document.querySelector("h1").innerText = "FRKN DRAW!!!";
}