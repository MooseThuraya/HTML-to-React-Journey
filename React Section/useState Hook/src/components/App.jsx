import React, {useState} from "react";

function App() {
  const [count, setCount] = useState(0);
  // [value, function]


  // Destructering for arrays and objects

  // const [red, green, blue] = [9, 132, 227];

  // console.log(blue);

function increase(){
  setCount(count + 1);
}

function decrease() {
  setCount(count - 1);
}

return (
  //this is what gets returned

  <div className="container">
    <h1>{count}</h1>
    <button onClick={increase}>+</button>
    <button onClick={decrease}>-</button>
  </div>
);
}

export default App;
