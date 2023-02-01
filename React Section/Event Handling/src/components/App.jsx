import React, { useState } from "react";

function App() {

  const [headingText, setHeadingText] = useState("Hello");
  const [isMouseOver, setMouseOver] = useState(false);


  let buttonColor = "";

  function handleClick() {
    setHeadingText("Submitted");
  
  }

  function handleOnMouseOver() {
    setMouseOver(true);

  }
  function handleOnMouseOut() {
    setMouseOver(false);

  }



  return (
    <div className="container">
      <h1>{headingText}</h1>
       {/* //we want this to have state */}

      <input type="text" placeholder="What's your name?" />
      <button style={ {backgroundColor: isMouseOver? "black": "white"}}
       onClick={handleClick}
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
      //  onMouseOut={handleOnMouseOut}
       >Submit</button>
    </div>
  );
}

export default App;
