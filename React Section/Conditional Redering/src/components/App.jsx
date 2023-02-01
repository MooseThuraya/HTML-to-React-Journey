import React from "react";
import Login from "./Login";

var isLoggedIn = true;

const currentTime = new Date(2020, 7, 12, 3).getHours();
console.log(currentTime);

function App() {
  return (
    //can only have expressions inline
    <div className="container">{
     // isLoggedIn ? <h1>Hello</h1> :  <Login />

     currentTime > 12 && <h1>Why are you working?</h1>

    }</div>
  );
}

export default App;
