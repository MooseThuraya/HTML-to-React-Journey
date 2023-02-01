//jshint esversion:6

//console.log(module); //module gives information about the file you are in


//this is what i choose to export if im called
//we dont put the parenthesis, we put it without so we let app.js determine when the function should be called.
exports.getDate = function (){
const today = new Date(); //this is a standard javaScript method

const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

return today.toLocaleDateString("en-US", options);

}

exports.getDay = function () {
    const today = new Date(); //this is a standard javaScript method

    const options = {
        weekday: "long"
    };

    return today.toLocaleDateString("en-US", options);
 
}