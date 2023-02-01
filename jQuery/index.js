$(document).ready(function(){//makes sure that the whole library has been loaded up before proceeding, otherwise some may not be loaded

    $("h1").css("color","red");//two properties set values
    $("h1").css("color");//single property returns value
    $("button").css("color", "red");

    $("h1").addClass("big-title");//to add a class to an element (h1)
    $("h1").removeClass("big-title");//removes

    $("h1").addClass("big-title margin-50"); //can addmultiple classed to an element by having a space in between them

    $("h1").hasClass("margin-50");//You are querying to check if margin-50 is an included class in h1
    //the above line returns a boolean

    $("button").text("Bye"); //set new text to the element. All will change
    
    $("button").html("<em>WAZZAUP</em>");//equavilent to .innerHTML. To all of course

    //jQuery is based on methods.

    // Manipulating Attributes with jQuery
    // attributes such as src, href

    console.log($("img").attr("src"));//this will return the src

    $("a").attr("href","https://www.yahoo.com")//if there is a second input we will set it to that otherwise if one, it will return

    $("h1").attr("class");//will return all classes for h1

    // How to add event listeners usinf jQuery

    $("h1").click(function (){//it will add an event listener and call the callback function when it detects a click
        $("h1").css("color","purple")
    });

    //we needed a for loop to an event listener to all buttons
    // for(var i = 0; i<5; i++){
    //     document.querySelectorAll("button")[i].addEventListener("click", function(){
    //     document.querySelector("h1").style.color ="purple";
    //     });
    // }

    //In jQuery
    $("button").click(function () {
        $("h1").css("color", "purple");
    });

    //to detect keystrokes in a textbox, we add he following
    $("input").keydown(function(event){
         console.log(event.key);
    });

    $("body").keydown(function (event) {//this will detect anywhere in the page. She says document instead of body works
       $("h1").text(event.key);
    });//this will change the h1 with every key press

    //AN EVEN MORE FLEXIBLE way to add event listeners
    //Which applies to any javascript event
    $("h1").on("mouseover",function(){//events such as "click" etc
        $("h1").css("color","purple");
    });

    //adding or removing elements with jQuery
    $("h1").before("<button>New</button>");//<button>New</button><h1>Hello</h1>
    $("h1").after("<button>New</button>");//<h1>Hello</h1><button>New</button>

    $("h1").prepend("<button>New</button>");//this does it right before. <h1><button>New</button>Hello</h1>
    $("h1").append("<button>New</button>");//this does it right after. <h1>Hello<button>New</button></h1>

    //to remove all buttons
    //$("button").remove();

    // $("button").on("click",function(){
    //     $("h1").hide();//hiding kills the flow of html
    // });

      //$("h1").show(); will show the h1

    // $("button").on("click", function () {
    //     $("h1").fadeOut();//add an animation
    // });

    // $("button").on("click", function () {
    //     $("h1").fadeIn();//add an animation
    // });

    // $("button").on("click", function () {
    //     $("h1").fadeToggle();//can click and re-click to undo
    // });

    // $("button").on("click", function () {
    //     $("h1").slideToggle();//also slideUp/slideDown
    // });

    // $("button").on("click", function () {
    //     $("h1").animate({margin: "20%"}); //change the css but can only change what's inside the braces of numeric values only 
    // });// can add percentages but only if they were strings

    $("button").on("click", function () {
        $("h1").slideUp().slideDown().animate({ opacity: 0.5 }); 
    });





  






});
